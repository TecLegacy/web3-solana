import {
  bundlrStorage,
  findMetadataPda,
  keypairIdentity,
  Metaplex,
  UploadMetadataInput,
} from '@metaplex-foundation/js';
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from '@solana/spl-token';
import {
  DataV2,
  createCreateMetadataAccountV2Instruction,
} from '@metaplex-foundation/mpl-token-metadata';
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';

const endpoint =
  'https://explorer.solana.com/address/GwX9HQ5zGeCnKn8YrqJPRsMDFXKxvzzFc2zvr5F8y31H?cluster=devnet'; //Replace with your RPC Endpoint
const solanaConnection = new Connection(endpoint);

// # MINT CONFIG
// setting how much fragments of token can be subdivided - numDecimals
// Limiting token mint after staturation point - numberTokens
const MINT_CONFIG = {
  numDecimals: 9,
  numberTokens: 1337, //limiting money printing
};

// # MINT META DATA
// # use Metaplex's uploadMetadata method to load this metadata to Arweave.(to backpack in ourcase)
const MY_TOKEN_METADATA: UploadMetadataInput = {
  name: 'Bank Token',
  symbol: 'BT',
  description: 'This Bank is Rich!',
  image:
    'https://ik.imagekit.io/hw4mk2vrzim/maxwed/lucknow_gUYbZYcpKV.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1677533887592', //add public URL to image you'd like to use
};

// second metadata variable that will be loading onto SOLANA into Metaplex's Program

const ON_CHAIN_METADATA = {
  name: MY_TOKEN_METADATA.name,
  symbol: MY_TOKEN_METADATA.symbol,
  uri: 'TO_UPDATE_LATER', //FIXME:later update karna hai
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
} as DataV2;

// TO upload on ARweave / (our backpack)

/**
 *
 * @param wallet Solana Keypair
 * @param tokenMetadata Metaplex Fungible Token Standard object
 * @returns Arweave url for our metadata json file
 */
const uploadMetadata = async (
  wallet: Keypair,
  tokenMetadata: UploadMetadataInput
): Promise<string> => {
  //create metaplex instance on devnet using this wallet
  const metaplex = Metaplex.make(solanaConnection)
    .use(keypairIdentity(wallet))
    .use(
      bundlrStorage({
        address:
          'https://explorer.solana.com/address/2gLo5yMkSKP4YCSrc1Wz347tMmT4kskk5ZcdD3iLgoao?cluster=devnet', //my wallet
        providerUrl: endpoint, //bank wallet
        timeout: 60000,
      })
    );

  //Upload to Arweave
  const { uri } = await metaplex.nfts().uploadMetadata(tokenMetadata);
  //   const { uri } = await metaplex.nfts().uploadMetadata(tokenMetadata);
  console.log(`BackPack URL: `, uri);
  return uri;
};

// Solana Transaction for our Mint
const createNewMintTransaction = async (
  connection: Connection,
  payer: Keypair,
  mintKeypair: Keypair,
  destinationWallet: PublicKey,
  mintAuthority: PublicKey,
  freezeAuthority: PublicKey
) => {
  //Get the minimum lamport balance to create a new account and avoid rent payments
  const requiredBalance = await getMinimumBalanceForRentExemptMint(connection);
  //metadata account associated with mint
  const metadataPDA = await findMetadataPda(mintKeypair.publicKey);
  //get associated token account of your wallet
  const tokenATA = await getAssociatedTokenAddress(
    mintKeypair.publicKey,
    destinationWallet
  );
};

// new transaction
const createNewTokenTransaction = new Transaction().add();
