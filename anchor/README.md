# Staking Pool Program Architecture

## Overview

This is an Anchor-based Solana program that implements a staking pool system. The program allows users to deposit tokens, stake them, and earn rewards over time. It includes features for pool initialization, deposits, withdrawals, and reward management.

## Core Components

### 1. Program Structure

- **Main Program**: Located in `lib.rs`, serves as the entry point and orchestrates all program instructions
- **Error Handling**: Custom error types defined in `error.rs`
- **Types**: Common types and constants defined in `types.rs`

### 2. State Management

The program maintains several key state accounts:

- **Pool State**: Tracks overall pool statistics and configuration
- **User State**: Individual user staking positions and rewards
- **Withdrawal State**: Manages pending withdrawal requests

### 3. Instructions

The program implements the following core instructions:

#### Pool Management

- `initiate_pool`: Creates and initializes a new staking pool
- `view_pool_stats`: Retrieves current pool statistics

#### User Operations

- `deposit`: Allows users to deposit tokens into the pool
- `undelegate`: Enables users to remove their stake
- `start_withdraw`: Initiates a withdrawal process
- `finalize_withdraw`: Completes a withdrawal after the cooldown period
- `view_user_rewards`: Checks user's current reward balance

### 4. Security Features

- Account validation and ownership checks
- Proper PDA (Program Derived Address) management
- Withdrawal cooldown periods
- Proper token account management

## Technical Architecture

### Account Structure

The program uses a combination of:

- Regular accounts for token management
- PDAs for program state
- System accounts for program interaction

### Data Flow

1. Pool initialization creates necessary accounts
2. Users deposit tokens into the pool
3. Rewards are calculated and distributed
4. Withdrawals follow a two-step process with cooldown

## Development

- Built using Anchor framework
- Rust-based implementation
- TypeScript for client interactions
- Comprehensive test suite

## Dependencies

- Anchor framework
- Solana Program Library (SPL)
- Various Rust crates for development and testing

## Testing

The program includes:

- Unit tests for individual instructions
