use std::collections::HashMap;

pub struct JoonError {
    name: String,
    message: String,
}

// trait Methods {
//     fn new(name: &str, message: &str) -> Self;
//     fn to_soft_error(name: &str, message: &str) -> Result<HashMap<String, String>, ()>;
// }

impl JoonError {
    pub fn new(name: &str, message: &str) -> Self {
        Self {
            name: name.to_string(),
            message: message.to_string(),
        }
    }

    // pub fn to_soft_error(name: &str, message: &str) -> Result<HashMap<String, String>, ()> {
    //     let mut map = HashMap::new();

    //     map.insert("name".to_string(), name.to_string());
    //     map.insert("message".to_string(), message.to_string());

    //     Ok(map)
    // }
    // pub fn to_soft_error(&mut self) -> Result<HashMap<String, String>, ()> {
    //     let mut map = HashMap::new();

    //     map.insert("name".to_string(), self.name.to_string());
    //     map.insert("message".to_string(), self.message.to_string());

    //     Ok(map)
    // }
    pub fn to_soft_error(&mut self) -> Result<(), HashMap<String, String>> {
        let mut map = HashMap::new();

        map.insert("name".to_string(), self.name.to_string());
        map.insert("message".to_string(), self.message.to_string());

        Err(map)
    }
}

// impl Methods for JoonError {
//     fn new(name: &str, message: &str) -> Self {
//         Self {
//             name: name.to_string(),
//             message: message.to_string(),
//         }
//     }

//     fn to_soft_error(name: &str, message: &str) -> Result<HashMap<String, String>, ()> {
//         let mut map = HashMap::new();

//         map.insert("name".to_string(), name.to_string());
//         map.insert("message".to_string(), message.to_string());

//         Ok(map)
//     }
// }
