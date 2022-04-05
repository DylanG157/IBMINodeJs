import emoji from 'node-emoji';
import chalk from 'chalk';

const STAR = emoji.get('star');
const HEAVY_CHECK_MARK = emoji.get('heavy_check_mark');
const RED_CROSS = emoji.get('x');
const BROKEN_HEART = emoji.get('broken_heart');
const DETECTIVE = emoji.get('female-detective');

const CHALK_RED = 'red';
const CHALK_WHITE = 'white';
const CHALK_GREEN = 'green';
const CHALK_CYAN = 'cyan';
const CHALK_BG_RED = 'bgRed';

function logFormattedResponse(color, string) {
  console.log(chalk[color].bold(string));
}

function logFormattedResponseBG(color, background, string) {
  console.log(chalk[color][background].bold(string));
}

const CONSOLE_SEPERATION_LINE_SINGLE =
  '===========================================================';
const CONSOLE_SEPERATION_LINE_DOUBLE = ` ${CONSOLE_SEPERATION_LINE_SINGLE} \n ${CONSOLE_SEPERATION_LINE_SINGLE}`;
export {
  STAR,
  HEAVY_CHECK_MARK,
  RED_CROSS,
  BROKEN_HEART,
  DETECTIVE,
  logFormattedResponse,
  logFormattedResponseBG,
  CONSOLE_SEPERATION_LINE_SINGLE,
  CONSOLE_SEPERATION_LINE_DOUBLE,
  CHALK_RED,
  CHALK_WHITE,
  CHALK_GREEN,
  CHALK_CYAN,
  CHALK_BG_RED,
};
