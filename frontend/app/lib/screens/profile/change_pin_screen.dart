import 'package:app/main.dart';
import 'package:app/view_models/user/pin_change_view_model.dart';
import 'package:app/widgets/login/key_board_key.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ChangePinScreen extends StatefulWidget {
  const ChangePinScreen({super.key});

  @override
  State<ChangePinScreen> createState() => _ChangePinScreenState();
}

class _ChangePinScreenState extends State<ChangePinScreen> {
  String pin = '';
  String content = '';

  @override
  void initState() {
    super.initState();
    pin = '';
    content = '새로운 암호를 입력해 주세요.';
  }

  final keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', const Icon(Icons.backspace_outlined)],
  ];

  onNumberPress(val) {
    final viewModel = Provider.of<PinChangeViewModel>(context, listen: false);
    setState(() {
      pin = pin + val;
      viewModel.setNewPin(pin);
    });

    if (pin.length == 4) {
      Navigator.pushNamed(context, '/changePinCheck');
      setState(() {
        pin = '';
      });
    }
  }

  onBackspacePress(val) {
    setState(() {
      pin = pin.substring(0, pin.length - 1);
    });
  }

  gradient1() {
    return BoxDecoration(
      gradient: LinearGradient(
        colors: [
          Colors.white.withOpacity(0.5),
          const Color.fromRGBO(215, 223, 243, 0.5)
        ],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ),
    );
  }

  gradient2() {
    return const BoxDecoration(
      gradient: LinearGradient(
        colors: [
          Color.fromRGBO(215, 223, 243, 0.5),
          Color.fromRGBO(175, 190, 240, 0.5)
        ],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ),
    );
  }

  gradient3() {
    return const BoxDecoration(
      gradient: LinearGradient(
        colors: [
          Color.fromRGBO(175, 190, 240, 0.5),
          Color.fromRGBO(135, 157, 238, 0.5)
        ],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ),
    );
  }

  gradient4() {
    return const BoxDecoration(
      gradient: LinearGradient(
        colors: [Color.fromRGBO(135, 157, 238, 0.5), blue100],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ),
    );
  }

  renderKeyboard() {
    List keyboardRows = [];
    for (int i = 0; i < keys.length; i++) {
      BoxDecoration decoration;
      if (i % 4 == 0) {
        decoration = gradient1();
      } else if (i % 4 == 1) {
        decoration = gradient2();
      } else if (i % 4 == 2) {
        decoration = gradient3();
      } else {
        decoration = gradient4();
      }
      keyboardRows.add(
        Container(
          decoration: decoration,
          child: Row(
            children: keys[i].map((y) {
              return Expanded(
                child: KeyboardKey(
                  label: y,
                  onTap: () {
                    if (y is Widget) {
                      onBackspacePress(y);
                    } else {
                      onNumberPress(y);
                    }
                  },
                  value: y,
                ),
              );
            }).toList(),
          ),
        ),
      );
    }
    return keyboardRows;
  }

  renderText() {
    TextStyle styleTitle =
        const TextStyle(fontSize: 30, fontWeight: FontWeight.w700, color: blue400);

    TextStyle styleContent = const TextStyle(
        fontSize: 15, fontWeight: FontWeight.w500, color: Colors.black);

    return Expanded(
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '암호 입력',
              style: styleTitle,
            ),
            const SizedBox(
              height: 10,
            ),
            Text(
              content,
              style: styleContent,
            ),
            const SizedBox(
              height: 20,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                for (num i = 1; i < 5; i++)
                  Text(
                    '*',
                    style: TextStyle(
                      color: pin.length >= i
                          ? blue100
                          : const Color.fromRGBO(227, 227, 227, 1),
                      fontWeight: FontWeight.bold,
                      fontSize: 50.0,
                    ),
                  ),
              ],
            )
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            renderText(),
            ...renderKeyboard(),
          ],
        ),
      ),
    );
  }
}
