mod esi;
mod evesettings;
mod updates;

use evesettings::{
    analyze_import, copy_settings, create_backup, delete_backup, execute_import, export_settings,
    get_app_data, set_alias, set_brackets_always_show,
};
use updates::check_for_update;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            get_app_data,
            create_backup,
            delete_backup,
            copy_settings,
            set_alias,
            set_brackets_always_show,
            check_for_update,
            export_settings,
            analyze_import,
            execute_import,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
