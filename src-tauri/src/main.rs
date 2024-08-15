// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::fs::OpenOptions;
use regex::Regex;
use std::sync::Mutex;
use tauri::State;
use tauri::Manager;
use std::io;
use std::io::Write;
use serde::Serialize;
use serde::Deserialize;
use thiserror::Error;
use std::path::Path;

// custom error type that implements serde::Serialize
// Note: Error implementation lifted straight from https://tauri.app/v1/guides/features/command/
#[derive(Debug, thiserror::Error)]
enum Error {
  #[error(transparent)]
  Io(#[from] std::io::Error)
}

// we must manually implement serde::Serialize. See above for where this code came from
impl serde::Serialize for Error {
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: serde::ser::Serializer,
  {
    serializer.serialize_str(self.to_string().as_ref())
  }
}

// tab struct
/*
 * id is a unique id (duh)
 * title is probably gonna be filename, but it can be whatever ig
 * content is the actual content itself
 * is_dirty indicates if there are unsaved changes
 * file contains filepath that tab content came from (if it came from a file)
 */
#[derive(Debug, Serialize, Deserialize, Clone)]
struct Tab {
    id: usize,
    title: String,
    content: String,
    is_dirty: bool,  // indicates if there are unsaved changes
    file: String, // filepath
}

// tab manager struct
/*
 * tabs is all the open tabs
 * active_tab is well, you know, the active tab...
 * not sure how necessary active_tab is but you never know
 */
#[derive(Debug, Serialize, Deserialize, Clone)]
struct TabManager {
    tabs: Vec<Tab>,  // list of tabs
    active_tab: Option<usize>,  // index of the active tab
    id: usize,
}

// implementation of functions for tabs
impl TabManager {

    // constructor
    fn new() -> Self {
        TabManager {
            tabs: Vec::new(),
            active_tab: None,
            id: 0,
        }
    }
    // creates new tab and adds it to the manager with a unique ID and everything
    fn add_tab(&mut self, title: String, content: String)  -> usize{
        let id = self.id;
        self.id += 1;  // increment id for each new tab
        self.tabs.push(Tab {
            id,
            title,
            content,
            is_dirty: false,
            file: String::new(),
        });
        return id;
    }

    // same as add_tab, but pre-loads the content from a file
    fn add_tab_file(&mut self, title: String, file_path: &str) -> Result<usize, Error> {
        let id = self.id;
        self.id += 1;  // increment id for each new tab
        let content = fs::read_to_string(file_path)?;
        self.tabs.push(Tab {
            id,
            title,
            content,
            is_dirty: false,
            file: file_path.to_string(),
        });
        Ok(id)
    }

    // getter for tab content
    fn get_content(&mut self, tab_id: usize) -> String {
        if let Some(tab) = self.tabs.iter_mut().find(|tab| tab.id == tab_id) {
            return tab.content.clone();
        } else {
            return String::new();
        }
    }

    // retains only the tabs with IDs different from the selected one, so effectively removes the chosen tab
    fn remove_tab(&mut self, tab_id: usize) {
        // TODO: close OFD
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

    // finds selected tab in the manager and saves its content to a file
    fn save_to_file(&mut self, id: usize, file_path: &str) -> Result<(), Error> {
        if let Some(tab) = self.tabs.iter_mut().find(|t| t.id == id) {

            // Open for writing. If exists, append. If not, create new
            let mut file = OpenOptions::new()
            .write(true)
            .create(true)
            .truncate(true)
            .open(file_path)?;

            // write (as bytes needed since Rust likes to be weird)
            file.write_all(tab.content.as_bytes())?;

            // update filepath and mark not dirty
            tab.file = file_path.to_string();
            tab.is_dirty = false;
        }
        Ok(())
    }

    // meant for use with ctrl+s handler. Checks if pre-saved file path is okay to write to
    fn check_valid_path(&mut self, tab_id: usize) -> bool {
        if let Some(tab) = self.tabs.iter_mut().find(|t| t.id == tab_id) {
            let path = Path::new(&tab.file);

            // check file still exists and wasn't somehow changed to a directory
            if !path.exists() || !path.is_file() {
                return false;
            }
        
            // Check if said file can be written to the same way save_to_file does
            return match fs::OpenOptions::new()
            .write(true)
            .create(true)
            .truncate(true)
            .open(path) {
                Ok(_) => true,
                Err(_) => false,
            };
        };
        false
    }

    fn get_filepath(&self, tab_id: usize) -> String {
        if let Some(tab) = self.tabs.iter().find(|t| t.id == tab_id) {
            tab.file.clone()
        } else {
            String::new()
        }
    }
    
}

// the following are all just wrappers for the tab manager functions. These are what the front end calls
// implemented as separate commands so that the Tauri state manager can come in
#[tauri::command]
fn add_tab(state: State<'_, Mutex<TabManager>>, title: String, content: String) -> usize {
    let mut manager = state.lock().unwrap();
    return manager.add_tab(title, content);
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

#[tauri::command]
fn save_to_file(state: State<'_, Mutex<TabManager>>, tab_id: usize, file_path: String) -> Result<(), Error> {
    let mut manager = state.lock().unwrap();
    manager.save_to_file(tab_id, &file_path)
}

#[tauri::command]
fn add_tab_file(state: State<'_, Mutex<TabManager>>, title: String, file_path: String) -> Result<usize, Error> {
    let mut manager = state.lock().unwrap();
    return manager.add_tab_file(title, &file_path)
}

#[tauri::command]
fn get_content(state: State<'_, Mutex<TabManager>>, tab_id: usize) -> String {
    let mut manager = state.lock().unwrap();
    return manager.get_content(tab_id)
}

#[tauri::command]
fn check_valid_path(state: State<'_, Mutex<TabManager>>, tab_id: usize) -> bool {
    let mut manager = state.lock().unwrap();
    return manager.check_valid_path(tab_id);
}

#[tauri::command]
fn get_filepath(state: State<'_, Mutex<TabManager>>, tab_id: usize) -> String {
    let mut manager = state.lock().unwrap();
    return manager.get_filepath(tab_id)
}


fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(TabManager::new()))
        .invoke_handler(tauri::generate_handler![
            add_tab, remove_tab, switch_tab, update_tab_content,
            save_to_file, add_tab_file, get_content, check_valid_path, get_filepath
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
