import 'package:flutter/material.dart';

class KeyboardKey extends StatefulWidget {
  final dynamic label;
  final dynamic value;
  final VoidCallback onTap;

  const KeyboardKey({
    super.key,
    required this.label,
    required this.onTap,
    required this.value,
  });

  @override
  State<KeyboardKey> createState() => _KeyboardKeyState();
}

class _KeyboardKeyState extends State<KeyboardKey> {
  renderLabel() {
    if (widget.label is String) {
      return Text(
        widget.label,
        style: const TextStyle(
          fontSize: 30.0,
          fontWeight: FontWeight.bold,
        ),
      );
    } else {
      return widget.label;
    }
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        widget.onTap();
      },
      child: AspectRatio(
        aspectRatio: 1.1,
        child: Center(
          child: renderLabel(),
        ),
      ),
    );
  }
}
