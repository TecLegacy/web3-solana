import { Connection } from '@solana/web3.js';

// estabilising connection to our bank publickey
const endpoint =
  'https://explorer.solana.com/address/GwX9HQ5zGeCnKn8YrqJPRsMDFXKxvzzFc2zvr5F8y31H?cluster=devnet'; //Replace with your RPC Endpoint
const solanaConnection = new Connection(endpoint);

// SOLANA CLI
/**
 * Estabilished connection to devnet-> solana config set --url https://api.devnet.solana.com
 * Created bank public key with  -> Solana-keygen new
 * Secret key config.json file ->Keypair Path: /home/keshav/.config/solana/id.json
 * Airdrop SOL to Bank public wallet -> Solana airdrop 1
 *
 *
 *
 */

// Solana Good to know commands
/**
 * Solana balance
 * Solana Address -> address of public key
 * Solana config get
 */
