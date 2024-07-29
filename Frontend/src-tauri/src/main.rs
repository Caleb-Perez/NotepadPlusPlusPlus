// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use regex::Regex;
use lazy_static::lazy_static;
use std::sync::Mutex;
use tauri::State;
use tauri::Manager;

// tab struct
/*
 * id is a unique id (duh)
 * title is probably gonna be filename, but it can be whatever ig
 * content is the actual content itself
 * is_dirty indicates if there are unsaved changes
 */
#[derive(Clone)]
struct Tab {
    id: usize,
    title: String,
    content: String,
    is_dirty: bool,  // indicates if there are unsaved changes
}

// tab manager struct
/*
 * tabs is all the open tabs
 * active_tab is well, you know, the active tab...
 * not sure how necessary active_tab is but you never know
 */
struct TabManager {
    tabs: Vec<Tab>,  // list of tabs
    active_tab: Option<usize>,  // index of the active tab
}

// implementation of functions for tabs
impl TabManager {

    // constructor
    fn new() -> Self {
        TabManager {
            tabs: Vec::new(),
            active_tab: None,
        }
    }
    // creates new tab and adds it to the manager with a unique ID and everything
    fn add_tab(&mut self, title: String, content: String) {
        let id = self.tabs.len();
        self.tabs.push(Tab {
            id,
            title,
            content,
            is_dirty: false,
        });
    }

    // retains only the tabs with IDs different from the selected one, so effectively removes the chosen tab
    fn remove_tab(&mut self, tab_id: usize) {
        self.tabs.retain(|tab| tab.id != tab_id);
    }

    // checks if selected tab exists in the manager, and sets it to active if so
    fn switch_tab(&mut self, tab_id: usize) {
        if self.tabs.iter().any(|tab| tab.id == tab_id) {
            self.active_tab = Some(tab_id);
        }
    }

    // finds selected tab in the manager and updates its content
    fn update_tab_content(&mut self, tab_id: usize, content: String) {
        if let Some(tab) = self.tabs.iter_mut().find(|tab| tab.id == tab_id) {
            tab.content = content;
            tab.is_dirty = true;
        }
    }

    // getter for active tab
    fn get_active_tab(&self) -> Option<&Tab> {
        self.active_tab.and_then(|id| self.tabs.iter().find(|tab| tab.id == id))
    }
}

// the following are all just wrappers for the tab manager functions. These are what the front end calls
#[tauri::command]
fn add_tab(state: State<'_, Mutex<TabManager>>, title: String, content: String) {
    let mut manager = state.lock().unwrap();
    manager.add_tab(title, content);
}

#[tauri::command]
fn remove_tab(state: State<'_, Mutex<TabManager>>, tab_id: usize) {
    let mut manager = state.lock().unwrap();
    manager.remove_tab(tab_id);
}

#[tauri::command]
fn switch_tab(state: State<'_, Mutex<TabManager>>, tab_id: usize) {
    let mut manager = state.lock().unwrap();
    manager.switch_tab(tab_id);
}

#[tauri::command]
fn update_tab_content(state: State<'_, Mutex<TabManager>>, tab_id: usize, content: String) {
    let mut manager = state.lock().unwrap();
    manager.update_tab_content(tab_id, content);
}

#[tauri::command]
fn get_active_tab(state: State<'_, Mutex<TabManager>>) -> Option<Tab> {
    let manager = state.lock().unwrap();
    manager.get_active_tab().cloned()
}

// greet command for random testing
/* Notes:
 * Always handy to have this around to play with how front and back interact without risking breaking anything
 * Will obviously be removed eventually, but for now you never know when you need a throwaway command
 */
#[tauri::command]
fn greet(msg: &str) -> String {
    format!("Updated: {}", msg)
}

#[tauri::command]
fn foo(message: String) -> String {
    let mut global_string = GLOBAL_STRING.lock().unwrap();
    *global_string = message.clone();
    format!("Received: {}", global_string)
}

// find and replace
/* Notes:
 * This command requires the "regex" feature in Cargo.toml
 * You need to escape special characters in s2 using regex::escape
 * The regex pattern should be created using regex::new
 * This command will replace all occurrences of s2 with s3 in s1. It returns a new String with the replacements.
 * Appears to work out of the box, but frontend should remember to fetch the result of this for it to show in the textarea
*/
#[tauri::command]
fn find_and_replace(s1: &str, s2: &str, s3: &str) -> String{
    let re = Regex::new(&regex::escape(s2)).unwrap();

    re.replace_all(s1, s3).to_string()
}

// save str to file 
/* Notes:
 * "file.txt" is hardcoded for testing. Obviously the user will get to pick
 * This command will overwrite the existing file if it exists. Need to prompt user instead of just doing it: WIP!
*/
#[tauri::command]
fn save_str(content: &str) -> Result<(), String> {
    use std::env;
    use std::path::PathBuf;

    let downloads_dir = env::var_os("HOME").map_or_else(
        || env::var_os("USERPROFILE").map(PathBuf::from),
        |home| {
            let mut path = PathBuf::from(home);
            path.push("Downloads");
            Some(path)
        },
    ).ok_or_else(|| "Error getting Downloads directory".to_string())?;

    let file_path = downloads_dir.join("file.txt"); // Replace "file.txt" with your desired file name

    match fs::write(file_path, content) {
        Ok(_) => Ok(()),
        Err(err) => Err(format!("Error saving file: {}", err)),
    }
}

lazy_static! {
    static ref GLOBAL_STRING: Mutex<String> = Mutex::new(String::new());
}



fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(TabManager::new()))
        .invoke_handler(tauri::generate_handler![
            greet, find_and_replace, save_str, foo,
            add_tab, remove_tab, switch_tab, update_tab_content
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
