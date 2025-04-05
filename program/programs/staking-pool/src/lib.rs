use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod error;
pub mod types;
pub mod accounts_ix; 

use accounts_ix::*;


declare_id!("Fg6PaFpoGXkYsidMpWxqSWz4LmD3FZXx74h57PjAgUmu");

#[program]

pub mod staking_pool {
    use super::*;

    use self::instructions::{
        initiate_pool, undelegate, deposit, withdraw,view_user_rewards, view_pool_stats
    };

    pub fn initiate_pool_config(ctx: Context<InitiatePool>, validator: Pubkey) -> Result<()> {
        initiate_pool(ctx, validator)
    }

    pub fn undelegate_pool_stake(ctx: Context<Undelegate>) -> Result<()> {
        undelegate(ctx)
    }

    pub fn deposit_stake(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        deposit(ctx, amount)
    }

    pub fn withdraw_stake(ctx: Context<Withdraw>) -> Result<()> {
        withdraw(ctx)
    }

    pub fn view_current_user_rewards(ctx: Context<ViewUserRewards>) -> Result<u64> {
        view_user_rewards(ctx)
    }

    pub fn view_total_pool_stats(ctx: Context<ViewPoolStats>) -> Result<crate::types::PoolStats> {
        view_pool_stats(ctx)
    }
}
