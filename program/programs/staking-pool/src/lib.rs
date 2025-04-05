use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod error;
pub mod types;
pub mod accounts; 

use accounts::*; 

declare_id!("Fg6PaFpoGXkYsidMpWxqSWz4LmD3FZXx74h57PjAgUmu");

#[program]
pub mod staking_pool {
    use super::*;

    pub fn initiate_pool(ctx: Context<InitiatePool>, validator: Pubkey) -> Result<()> {
        initiate_pool(ctx, validator)
    }

    pub fn undelegate(ctx: Context<Undelegate>) -> Result<()> {
        undelegate(ctx)
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        deposit(ctx, amount)
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        withdraw(ctx)
    }

    pub fn view_user_rewards(ctx: Context<ViewUserRewards>) -> Result<u64> {
        view_user_rewards(ctx)
    }

    pub fn view_pool_stats(ctx: Context<ViewPoolStats>) -> Result<crate::types::PoolStats> {
        view_pool_stats(ctx)
    }
}
