# BattyaBoss Discord Bot

BattyaBoss is a comprehensive Discord bot designed to handle nearly all aspects of Discord server management and engagement. 

## Features

### Moderation
- User timeout management
- Message clearing/purging
- Voice channel member movement
- Infractions tracking

### User Engagement
- Ranking system
- Custom color roles
- Coinflip game
- Weather information
- Status tracking

### Server Management
- Welcome messages
- Member verification
- Logging system
- GPT integration
- Custom rules setup

### Logging Capabilities
- Channel permission changes
- Channel topic updates
- Member nickname changes
- Role changes
- Voice channel activities
- Message edits
- Role permission/position updates
- Voice state tracking (mute/deafen/streaming)

## Setup

1. Clone the repository
2. Run `setup.bat` to install dependencies
3. Configure your settings in `config.json`
4. Start the bot using `start.bat`

## Command Categories

- **Developer Commands**: Technical and setup commands
- **Moderation Commands**: Server management tools
- **Public Commands**: General user interactions
- **Setup Commands**: System configuration
  - Color system
  - GPT integration
  - Logging
  - Ranking
  - Verification
  - Welcome messages

## Database Schemas

The bot uses MongoDB for data storage with schemas for:
- User infractions
- User profiles
- Verification codes
- Color roles
- GPT settings
- Logging configuration
- Rank tracking
- Welcome messages

## License

This project is licensed - see the LICENSE file for details.

## Requirements

- Node.js
- MongoDB
- Discord.js

For detailed configuration and usage instructions, please refer to the command documentation or contact the developer.
