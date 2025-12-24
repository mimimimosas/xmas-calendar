import React, { useState } from "react";
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Toolbar,
  MenuList,
  MenuListItem,
  Separator,
  ScrollView,
} from "react95";
import { createPortal } from "react-dom";
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original'
import Win95Player from "./YtPlayer";
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

// normale Schrift schon geladen
const normalFont = new FontFace('ms_sans_serif', `url(${ms_sans_serif})`);
normalFont.load().then((loadedFont) => document.fonts.add(loadedFont));

// bold Schrift laden
const boldFont = new FontFace('ms_sans_serif', `url(${ms_sans_serif_bold})`, {
  weight: 'bold'
});
boldFont.load().then((loadedFont) => document.fonts.add(loadedFont));

const Win95ScrollView = styled(ScrollView)`
  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #c0c0c0;
    border: 2px solid #fff;
  }
  &::-webkit-scrollbar-thumb {
    background: #808080;
    border: 2px solid #c0c0c0;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  scrollbar-width: thin;
  scrollbar-color: #808080 #c0c0c0;
`;

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


export default function ContentWindow({onClose, song, interpret, imgSrc, videoId, message, spotifyLink, appleLink}) {
  const [open, setOpen] = useState(false);

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
    <Window style={{ width: 600 }}>
      <WindowHeader className="window-header" style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <img
          src = "data:image/x-icon;base64,AAABAAMAICAQAAEABADoAgAANgAAABAQEAABAAQAKAEAAB4DAAAgIAAAAQAIAKgIAABGBAAAKAAAACAAAABAAAAAAQAEAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIAAAACAgACAAAAAgACAAICAAADAwMAAgICAAAAA/wAA/wAAAP//AP8AAAD/AP8A//8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACId3u7oAAAAAAAAAAAAACId3d3u6p4AAAAAAAAAAAId3d3e7uqfu4AAAAAAAAAj3d3d3e6p+7ucAAAAAAACPf3d3d7uqfu53cAAAAAAAiPf3d3d7p+7nd3AAAAAACIePf3d3u6fud3d3AAAAAAh4ePf3d3t+53d3dwAAAACHh4ePf3iIjnd3d3dwAAAAiHh4ePeAAAh3d3d3cAAAAIeHh4eIAAAAh3d3d3AAAACIeHh4eAAAAId3d3dwAAAAh3d3d3gAAACAB3d3cAAAAId3d3foAAAAgAB3d3AAAACHd3d+d4AAAAAAAAAAAAAAh3d353qoiID/8P//////8Ah37neq67dwAAAAAAAAAAAI7ud6ruu3cP/w/wAP8ADwAI53qq7rt3AAAAAAAAAAAACHeqru67dw//D//w//8PAACKqq7uu3cAAAAAAAAAAAAACKru67t3d3d3AAAAAAAAAACIjuu7d3d3AAAAAAAAAAAAAIiLu3d4iAAAAAAAAAAAAAAACIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////+A///+AB//+AAH//AAA//gAAH/wAAA/8AAAP+AAAB/gAAAfwAAAD8AAAA/AB4APwAeAD8AHgA/AB4APwAAAAAAAAAAgAAAAIAAAADAAAAAwAAAAOAAAADwAAN7+AAHe/4AHwP/wP8D////////////////KAAAABAAAAAgAAAAAQAEAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIAAAACAgACAAAAAgACAAICAAADAwMAAgICAAAAA/wAA/wAAAP//AP8AAAD/AP8A//8AAP//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"
          alt = "Connected"
          style= {{width: 26, height: 26}}
        />
        <span style={{ fontFamily: "'ms_sans_serif', sans-serif", fontSize: "14px", fontWeight: "bold" }}>
          SONG OF THE DAY
        </span>
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      </WindowHeader>
    <Toolbar noPadding style={{ display: "flex", justifyContent: "flex-start", fontFamily: "'ms_sans_serif', sans-serif",}}>
      <Button 
        variant='raised'
        onClick={() => window.open(spotifyLink)}
      >
        Spotify
      </Button>
      <Button 
        variant='raised'
        onClick={() => window.open(appleLink)}
      >
        Apple
      </Button>
      <div style={{position: 'relative', display: 'inline-block', alignSelf: 'left'}}>
        <Button
          variant="raised"
          onClick={() => setOpen(!open)}
          active={open}
        >
          Share
        </Button>
        {open && (
          <MenuList style = {{position:"absolute", right: 0, top: "70%", zIndex: 9999}}
            onClick= {() => setOpen(false)}
          >
            <MenuListItem size='sm'>Copy link</MenuListItem>
            <Separator />
            <MenuListItem size='sm'>Facebook</MenuListItem>
            <MenuListItem size='sm'>Twitter</MenuListItem>
            <MenuListItem size='sm'>Instagram</MenuListItem>
          </MenuList>
        )}
      </div>
    </Toolbar>
      <WindowContent style={{padding: "2px", paddingTop:"8px"}}>
          <div style={{display: 'flex', height: '100%', gap: '8px',}}>
          {/* left colum */}
            <div style={{flex: 1, border: '1px inset', padding: '4px'}}>
              <Win95Player 
                videoId ={videoId}
                imgSrc={imgSrc}
                />
            </div>
          {/* right colum */}
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h2 style={{ marginBottom: '4px', marginTop: "-8px", fontFamily: "'ms_sans_serif', sans-serif"}}>{song}</h2>
              <h3 style={{ marginBottom: "8px", marginTop: '0px', fontFamily: "'ms_sans_serif', sans-serif" }}>{interpret}</h3>
              <Win95ScrollView  style={{ height: 200, width: '100%', fontFamily: "'ms_sans_serif', sans-serif", fontSize: '16px', lineHeight: '1.'}}>
                <div style={{ padding: "4px" }}>
                    {message.split("\n\n").map((paragraph, index) => (
                      <p key={index} style={{ marginTop: 0 }}>
                        {paragraph.split("\n").map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    ))}
                </div>
              </Win95ScrollView >
            </div>
          </div>
      </WindowContent>
    </Window>
    </div>
    </ThemeProvider>,
    document.body
  );
}
