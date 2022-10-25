import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

import 'dart:html';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {

  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {

  bool dark = true;

  @override
  Widget build(BuildContext context) {
    var link = TapGestureRecognizer();
    link.onTap = () => window.open("SWAssistant", "SWAssistant");
    return MaterialApp(
      title: 'Darkstorm.tech',
      themeMode: dark ? ThemeMode.dark : ThemeMode.light,
      theme: ThemeData(
        primarySwatch: Colors.orange,
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.orange
      ),
      home: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Text("TODO: Make a website"),
          Container(height: 5),
          Text.rich(
            TextSpan(
              text: "SWAssistant for Web",
              style: const TextStyle(
                decoration: TextDecoration.underline,
                decorationColor: Colors.blueAccent
              ),
              recognizer: link,
            )
          ),
          Container(height: 5),
          ElevatedButton(
            onPressed: () => setState(() => dark = !dark),
            child: dark ? const Text("Light Mode") : const Text("Dark Mode")
          )
        ],
      ),
    );
  }
}
