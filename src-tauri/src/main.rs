// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::Manager;
use tauri::{
    CustomMenuItem, Menu, MenuItem, Submenu, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

fn main() {
    // here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let print = CustomMenuItem::new("print".to_string(), "Print");
    let submenu = Submenu::new(
        "File",
        Menu::new().add_item(print).add_item(close).add_item(quit),
    );
    //let viewmenu = Submenu::new("View", Menu::new().add_item(print).add_item(close).add_item(quit),);
    let menu = Menu::new()
        .add_submenu(submenu)
        .add_submenu(Submenu::new(
            "Edit",
            Menu::new()
                .add_native_item(MenuItem::Copy)
                .add_native_item(MenuItem::Cut)
                .add_native_item(MenuItem::Undo)
                .add_native_item(MenuItem::Redo)
                .add_native_item(MenuItem::SelectAll)
                .add_native_item(MenuItem::Paste),
        ))
        .add_submenu(Submenu::new(
            "Window",
            Menu::new()
                .add_native_item(MenuItem::Minimize)
                .add_native_item(MenuItem::Hide)
                .add_item(CustomMenuItem::new("maximize".to_string(), "Maximize"))
                .add_item(
                    CustomMenuItem::new("fullscreen".to_string(), "Full Screen")
                        .accelerator("CmdOrCtrl+f"),
                )
                .add_native_item(MenuItem::Paste),
        ))
        .add_submenu(Submenu::new(
            "View",
            Menu::new()
                .add_item(CustomMenuItem::new("go_back", "Go Back").accelerator("CmdOrCtrl+["))
                .add_item(
                    CustomMenuItem::new("go_forward", "Go Forward").accelerator("CmdOrCtrl+]"),
                )
                .add_item(
                    CustomMenuItem::new("scroll_top", "Scroll to Top of Screen")
                        .accelerator("CmdOrCtrl+Up"),
                )
                .add_item(
                    CustomMenuItem::new("scroll_bottom", "Scroll to Bottom of Screen")
                        .accelerator("CmdOrCtrl+Down"),
                )
                .add_native_item(MenuItem::Separator)
                .add_item(
                    CustomMenuItem::new("zoom_0", "Zoom to Actual Size").accelerator("CmdOrCtrl+0"),
                )
                .add_item(CustomMenuItem::new("zoom_out", "Zoom Out").accelerator("CmdOrCtrl+-"))
                .add_item(CustomMenuItem::new("zoom_in", "Zoom In").accelerator("CmdOrCtrl+Plus"))
                .add_native_item(MenuItem::Separator)
                .add_item(
                    CustomMenuItem::new("reload", "Refresh the Screen").accelerator("CmdOrCtrl+R"),
                ),
        ));
        //.add_item(CustomMenuItem::new("hide", "Hide"));
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide)
        .add_item(show);
    let system_tray = SystemTray::new().with_menu(tray_menu);
    tauri::Builder::default()
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a left click");
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }
                "show" => {
                    let window = app.get_window("main").unwrap();
                    window.show().unwrap();
                }
                _ => {}
            },
            _ => {}
        })
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            "close" => {
                event.window().close().unwrap();
            }
            "print" => {
                event.window().print().unwrap();
            }
            "zoom" => {

            }
            "hide" => {
                event.window().hide().unwrap();
            }
            "maximize" => {
                event.window().maximize().unwrap();
            }
            "fullscreen" => {
                event.window().set_fullscreen(!event.window().is_fullscreen().unwrap_or(false)).unwrap();
            }
            "zoom_0" => event.window().eval("window.__zoom0 && window.__zoom0()").unwrap(),
           "zoom_out" => event.window().eval("window.__zoomOut && window.__zoomOut()").unwrap(),
           "zoom_in" => event.window().eval("window.__zoomIn && window.__zoomIn()").unwrap(),
            "reload" => event.window().eval("window.location.reload()").unwrap(),
            "go_back" => event.window().eval("window.history.go(-1)").unwrap(),
            "go_forward" => event.window().eval("window.history.go(1)").unwrap(),
            "scroll_top" => event.window()
            .eval(
                r#"window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
                })"#,
            )
            .unwrap(),
            "scroll_bottom" => event.window()
            .eval(
                r#"window.scroll({
                top: document.body.scrollHeight,
                left: 0,
                behavior: "smooth"})"#,
            )
            .unwrap(),
            _ => {}
        })
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();
            let _ = main_window.with_webview(|webview| {
                #[cfg(target_os = "linux")]
                {
                // see https://docs.rs/webkit2gtk/0.18.2/webkit2gtk/struct.WebView.html
                // and https://docs.rs/webkit2gtk/0.18.2/webkit2gtk/trait.WebViewExt.html
                use webkit2gtk::traits::WebViewExt;
                webview.inner().set_zoom_level(4.);
                }

                #[cfg(windows)]
                unsafe {
                // see https://docs.rs/webview2-com/0.19.1/webview2_com/Microsoft/Web/WebView2/Win32/struct.ICoreWebView2Controller.html
                webview.controller().SetZoomFactor(1.).unwrap();
                }

                #[cfg(target_os = "macos")]
                unsafe {
                let () = msg_send![webview.inner(), setPageZoom: 4.];
                let () = msg_send![webview.controller(), removeAllUserScripts];
                let bg_color: cocoa::base::id = msg_send![class!(NSColor), colorWithDeviceRed:0.5 green:0.2 blue:0.4 alpha:1.];
                let () = msg_send![webview.ns_window(), setBackgroundColor: bg_color];
                }
            })
            ;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
