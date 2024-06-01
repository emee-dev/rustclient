// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use tauri::api::process::{Command, CommandEvent};
// use std::{ fmt::format };

// use reqwest::Response;
// use serde::{ Deserialize, Serialize };

// #[derive(Serialize, Deserialize)]
// struct AspenHttpError {
//     name: String,
//     message: String,
// }

// #[derive(Serialize, Deserialize)]
// struct AspenHttpRes {
//     url: String,
//     status_code: u16,
//     method: String,
//     responseheaders: Option<String>,
// }

// #[tauri::command]
// async fn get_request(data: String) -> Result<None<Inknown>, String> {
//     let new_todo = reqwest::Client::new();

//     let client: Result<Response, reqwest::Error> = new_todo
//         // .post("https://echo.free.beeceptor.com/sample-request?author=beeceptor")
//         .get("https://pokeapi.co/api/v2/pokemon/ditto")
//         .header("Content-Type", "application/json")
//         .send()
//         .await;

//     // let response = client.

//     Ok(());
// }

mod system;

use std::collections::HashMap;
use reqwest::Response;
use system::JoonError;
// use serde_json::Result;

struct HttpRequest {
    url: String,
    method: String,
    body: String,
    headers: HashMap<String, String>,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

enum Returns {
    Some(Result<HashMap<String, String>, ()>),
    None(Result<String, ()>),
}

#[tauri::command]
async fn respond_hashmap() -> Result<HashMap<String, String>, ()> {
    let mut map = HashMap::new();

    map.insert("key1".to_string(), "value1".to_string());
    map.insert("key2".to_string(), "value2".to_string());
    map.insert("key3".to_string(), "value3".to_string());

    // JoonError::new("name", "message");

    let a = JoonError::new("Reqwest", "invalid http token").to_soft_error();

    // JoonError::to_soft_error(name, message)

    if true {
        drop(map);
        return Err(());
    } else {
        return Ok(map);
    }
}

#[tauri::command]
async fn request_headers(headers: HashMap<String, String>) -> Result<String, ()> {
    let mut map = HashMap::new();

    for (key, value) in headers.iter() {
        map.insert(key, value);
        println!("{} {}", key, value);
    }

    Ok("Headers was captured".to_string())
}

// #[tauri::command]
// async fn command_to_spawn_sidecar(text: &str) -> Result<String, String> {
//     let (mut rx, mut child) = Command::new_sidecar("app")
//         .expect("failed to create `my-sidecar` binary command")
//         .spawn()
//         .expect("Failed to spawn sidecar");

//     child
//         .write(text.as_bytes())
//         .expect("Failed to write to sidecar");
//     drop(child);

//     let mut output = String::new();
//     while let Some(event) = rx.recv().await {
//         if let CommandEvent::Stdout(line) = event {
//             output.push_str(&line);
//         }
//     }

//     Ok(output)
// }

// #[tauri::command]
// async fn get_request() -> Result<String, String> {
//     let new_todo = reqwest::Client::new();

//     let valu: Result<Response, reqwest::Error> = new_todo
//         // .post("https://echo.free.beeceptor.com/sample-request?author=beeceptor")
//         .post("https://postman-echo.com/post")
//         // .post("https://poop;lho.coms/post")
//         .header("Content-Type", "application/json")
//         .send().await;

//     match valu {
//         Ok(_) => {
//             let val = AspenHttpRes {
//                 url: "https://postman-echo.com/post".to_string(),
//                 method: "get".to_string(),
//                 status_code: 200,
//                 responseheaders: None,
//             };

//             Ok(valu.unwrap().text().await.unwrap())
//         }

//         Err(_) => {
//             let res = AspenHttpError {
//                 name: "Reqwest Error".to_string(),
//                 message: valu.unwrap_err().to_string(),
//             };

//             let final_value = serde_json::to_string(&res);
//             Err(final_value.unwrap())
//         }
//     }
// }

// #[tokio::main]
// async fn main() -> Result<(), Box<dyn std::error::Error>> {
//     tauri::Builder
//         ::default()
//         .invoke_handler(tauri::generate_handler![greet, get_request])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");

//     Ok(())
// }

#[tokio::main]
async fn main() {
    tauri::Builder
        ::default()
        .invoke_handler(tauri::generate_handler![greet, respond_hashmap, request_headers])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
