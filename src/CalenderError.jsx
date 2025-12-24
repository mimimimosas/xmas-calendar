import React from "react";
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Toolbar,
} from "react95";
import { createPortal } from "react-dom";
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original'

const CloseIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: -1px;
  margin-top: -1px;
  transform: rotateZ(45deg);
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    background: ${({ theme }) => theme.materialText};
  }

  &:before {
    height: 100%;
    width: 3px;
    left: 50%;
    transform: translateX(-50%);
  }

  &:after {
    height: 3px;
    width: 100%;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default function ErrorWindow({ title = "Error", message, onClose }) {
  return createPortal(
    <ThemeProvider theme = {original}>
    <div style={{
        position: "fixed",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)"}}>
    <Window style={{ width: 400 }}>
      <WindowHeader className="window-header" style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <span>{title}</span>
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      </WindowHeader>
      <WindowContent>
        <div style={{display: "flex", alignItems: "center", gap: "24px"}}>
            <img
              src="data:image/x-icon;base64,AAABAAMAICAQAAEABADoAgAANgAAACAgAgABAAEAMAEAAB4DAAAQEBAAAQAEACgBAABOBAAAKAAAACAAAABAAAAAAQAEAAAAAACAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIAAAACAgACAAAAAgACAAICAAADAwMAAgICAAAAA/wAA/wAAAP//AP8AAAD/AP8A//8AAP///wAAAAAAAAAIiIiIgAAAAAAAAAAAAACIiIiIiIiIAAAAAAAAAAAIgRERERiIiIAAAAAAAAAIERmZmZmREYiIgAAAAAAAgZmZmZmZmZkYiIgAAAAAARmZmZmZmZmZkRiIgAAAABmZmZmZmZmZmZmRiIAAAAGZmZmZmZmZmZmZmRiIAAABmZmZmZmZmZmZmZkYiIAAGZmZn5mZmZmZ+ZmZkYiAAZmZmf/5mZmZn/+ZmZkYgAGZmZ///5mZmf//+ZmZGIgBmZmZ///5mZ///5mZmRiIGZmZmZ///5n///mZmZmRiBmZmZmZ//////+ZmZmZkYgZmZmZmZ/////5mZmZmZGIGZmZmZmZ////mZmZmZmRiBmZmZmZmf///5mZmZmZkYgZmZmZmZ/////5mZmZmZGIGZmZmZn//////5mZmZmRgBmZmZmf//+Z///5mZmZkYABmZmZ///5mZ///5mZmRiAAZmZn///mZmZ///5mZkYAAGZmZn/+ZmZmZ//mZmZEAAAGZmZn5mZmZmZ+ZmZkYAAAAGZmZmZmZmZmZmZmRgAAAABmZmZmZmZmZmZmZkQAAAAABmZmZmZmZmZmZmRAAAAAAABGZmZmZmZmZmREAAAAAAAAAGZmZmZmZmZEAAAAAAAAAAAERmZmZmREQAAAAAAAAAAAAABEREREAAAAAAAAP/4B///wAD//4AAf/4AAB/8AAAP+AAAB/AAAAfgAAAD4AAAAcAAAAGAAAABgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAYAAAAGAAAADgAAAB8AAAAfgAAAP4AAAH/AAAD/4AAB//gAB//8AA///4B//KAAAACAAAABAAAAAAQABAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAB/gAAD//AAB//4AB///gA///8AP///AH7/34D8f4/A+D8HwPweD8H+DB/h/wA/4f+Af+H/wP/h/8D/4f+Af+H/AD/h/gwf4PweD8D4PwfA/H+PwH7/34A///8AP///AB///gAH//gAA//wAAB/gAAAAAAD////////////gH///AAP//gAB//gAAH/wAAA/4AAAH+AAAB/AAAAPgAAAB4AAAAeAAAAHAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAOAAAAHgAAAB4AAAAfAAAAP4AAAH+AAAB/wAAA/+AAAf/4AAf//AAP//+Af/ygAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAICAgAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8AAAAAiIiAAAAAAIEREYiAAAABGZmZEYgAABmZmZmZGIABmfmZmfmRgAGf/5mf/5GIGZn/+f/5mRgZmZ///5mZGBmZmf/5mZkYGZmf//+ZmRgZmf/5//mZEAGf/5mf/5GAAZn5mZn5kQAAGZmZmZkQAAABGZmZEQAAAAABEREAAAD8HwAA8AcAAOADAADAAQAAgAEAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAIABAACAAwAAwAcAAOAPAAD4PwAA" 
              alt="info"
              style={{width: 48, height: 48}}
            />
            <span>{message}</span>
        </div>
        <Toolbar style={{ justifyContent: "center", marginTop: 16 }}>
          <Button onClick={onClose} primary>
            Okay
          </Button>
        </Toolbar>
      </WindowContent>
    </Window>
    </div>
    </ThemeProvider>,
    document.body
  );
}
