
# Web3 Wallet Application

A modern, responsive Web3 wallet application built with React.js that allows users to connect their Ethereum wallets, view token balances, and transfer tokens with a beautiful glassmorphism UI.

 

## Features
<img width="1883" height="612" alt="image" src="https://github.com/user-attachments/assets/d78a8ea1-c8a6-43ac-8e59-504b6cdb49a6" />
<img width="1869" height="624" alt="image" src="https://github.com/user-attachments/assets/863efd7a-633f-4b87-bfb8-988356a70fe1" />
<img width="1861" height="478" alt="image" src="https://github.com/user-attachments/assets/79f53a46-e4b4-471c-9d5a-83188998be91" />
<img width="1866" height="778" alt="image" src="https://github.com/user-attachments/assets/aac85aad-70ff-4f7c-919a-216c98dae295" />

###  Wallet Connection
- **MetaMask Integration** - Connect using MetaMask browser extension
- **WalletConnect Support** - Scan QR code to connect mobile wallets
- **Connection Status** - Real-time connection status with visual indicators
- **Auto-reconnection** - Remembers wallet connection across sessions

### Token Management
- **Balance Display** - View your token balance in real-time
- **Token Information** - Shows token symbol, decimals, and contract details
- **Refresh Functionality** - Manual balance refresh with loading states

###  Token Transfer
- **Send Tokens** - Transfer tokens to any Ethereum address
- **Form Validation** - Real-time validation for addresses and amounts
- **Transaction Status** - Loading states and success/error feedback
- **Gas Fee Estimation** - Smart contract interaction with proper gas handling

###  Modern UI/UX
- **Glassmorphism Design** - Modern glass-like UI effects
- **Responsive Layout** - Works perfectly on mobile and desktop
- **Dark Theme** - Beautiful dark mode interface
- **Smooth Animations** - Hover effects, transitions, and loading animations
- **Toast Notifications** - User-friendly success/error messages

##  Tech Stack

### Frontend
- **React 18.0.0** - Modern React with hooks
- **React Router 5.2.0** - Client-side routing
- **Bootstrap 5.2.1** - Responsive CSS framework
- **Material-UI 4.11.3** - React UI components
- **React Toastify 10.0.4** - Toast notifications

### Web3 Integration
- **Web3.js 1.10.4** - Ethereum JavaScript API
- **@web3-react/core 8.2.0** - React hooks for Web3
- **@web3-react/metamask 8.2.1** - MetaMask connector
- **@web3-react/walletconnect-v2 8.3.7** - WalletConnect integration
- **Ethers 5.7.2** - Ethereum library

### Styling & Animation
- **SASS 1.65.1** - CSS preprocessor
- **Animate.css 4.1.1** - CSS animations
- **AOS 2.3.4** - Animate on scroll library
- **Styled Components 5.3.1** - CSS-in-JS styling

##  Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension
- Ethereum testnet access (Sepolia recommended)

### Setup Steps

1. **Clone the repository**
```bash
https://github.com/mirbasit01/web3-wallet-app.git
cd web3-wallet-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
REACT_APP_CONTRACT_ADDRESS=your_token_contract_address
REACT_APP_INFURA_PROJECT_ID=your_infura_project_id
REACT_APP_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
REACT_APP_NETWORK_ID=11155111
REACT_APP_NETWORK_NAME=sepolia
```

4. **Setup contract configuration**
Update the contract files:
- `src/utils/contract/contractAddress.js`
- `src/utils/contract/contractABI.js`

5. **Start the development server**
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Sidebar.js              # Main wallet sidebar component
│   ├── TokenBalance.js         # Token balance display
│   ├── TokenSendTransfer.js    # Token transfer component
│   ├── WalletSidebar.css       # Wallet styling
│   └── TokenComponents.css     # Token components styling
├── hook/
│   ├── useAuth.js              # Authentication hooks
│   ├── useWeb3.js              # Web3 connection hooks
│   └── useTokensend.js         # Token transfer hooks
├── utils/
│   ├── contract/
│   │   ├── contractABI.js      # Smart contract ABI
│   │   └── contractAddress.js  # Contract address
│   └── wallet.js               # Wallet utilities
├── assets/
│   └── dashboard/
│       ├── metamask 2.png      # MetaMask logo
│       └── walletconnect.png   # WalletConnect logo
└── App.js                      # Main application component
```

##  UI Components

### Wallet Sidebar
- Connection status indicator
- Connect/Disconnect functionality
- Balance display with ETH
- Account address (truncated)
- Chain ID information

### Token Balance
- Real-time token balance
- Token symbol display
- Refresh functionality
- Loading and error states
- Account information

### Token Transfer
- Recipient address input (with validation)
- Amount input with validation
- Send button with loading states
- Transaction feedback
- Form validation and error handling

## 🔧 Configuration

### Smart Contract Setup
1. Deploy your ERC-20 token contract
2. Update `contractAddress.js` with your contract address
3. Update `contractABI.js` with your contract ABI

### Network Configuration
The app is configured for Ethereum Sepolia testnet by default. To change networks:

1. Update network configuration in `utils/wallet.js`
2. Modify chain ID in environment variables
3. Update RPC endpoints if needed

### Wallet Configuration
- MetaMask: Automatically detected if installed
- WalletConnect: Requires project ID from WalletConnect Cloud

##  Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy to Netlify
1. Build the project
2. Upload `build` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Deploy to Vercel
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy with automatic builds

##  Testing

### Run Tests
```bash
npm test
# or
yarn test
```

### Test Coverage
```bash
npm run test -- --coverage
# or
yarn test --coverage
```

##  Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🔐 Security Features

- Input validation for all forms
- Address format validation
- Amount validation with decimals
- Error handling for all Web3 operations
- Secure wallet connection management
- Transaction confirmation handling

## 🎯 Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use meaningful component names
- Write clear commit messages
- Add comments for complex logic
- Test on multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/web3-wallet-app/issues) page
2. Create a new issue with detailed information
3. Join our [Discord community](https://discord.gg/your-server)
4. Email support: support@yourproject.com

## 🙏 Acknowledgments

- [Web3.js](https://web3js.readthedocs.io/) - Ethereum JavaScript API
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [MetaMask](https://metamask.io/) - Ethereum wallet
- [WalletConnect](https://walletconnect.com/) - Open protocol for wallet connections

 

**Made with ❤️ by [Your Name](https://github.com/mirbasit01)**
 

### 🏆 Features Roadmap

- [ ] Multi-chain support (Polygon, BSC)
- [ ] NFT display and transfer
- [ ] DeFi integrations
- [ ] Portfolio tracking
- [ ] Price charts and analytics
- [ ] Hardware wallet support
- [ ] Transaction history
- [ ] Address book functionality
