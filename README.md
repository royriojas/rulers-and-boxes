# Rulers and boxes

This is a super simple chrome extension that will allow users to create rulers and boxes to help with their Pixel perfect designs. 

## Installation

1. clone this repo to your computer
2. create an `.env` with a `DATADOG_URL` entry like `DATADOG_URL=https://app.datadog.com`
2. run `yarn`
3. run `yarn build`
4. navigate to `chrome://extensions` and choose load unpacked and choose the `pkg` folder

## Usage 

On the rulers and boxes popover choose to create a ruler or a box based on your needs

## Features

- Move the rulers by dragging it or with the keyboard
- Arrow keys move the rulers and boxes `1px` at a time
- Pressing the command key will move the box or ruler by `5px` at a time
- Select a box and press `delete` (or `fn` + `backspace`) to remove a box or ruler.
- The size of a box can be changed by dragging the corner of the box. 
- The size of a box can be set by running `window.__rulers.setCurrentBoxSize(width, height)`



