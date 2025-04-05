use anchor_lang::prelude::*;

pub mod instructions;
pub mod accounts_ix; 
pub mod state;
pub mod error;
pub mod types;


use accounts_ix::*;


declare_id!("DjNn4MyhY2SGKrjLygcrYW89x52veVknfVcMkB8h9N9r");

#[program]

pub mod staking_pool {
    use super::*;

    use self::instructions::{
        initiate_pool, undelegate, deposit, finalize_withdraw, start_withdraw, view_user_rewards, view_pool_stats
    };

    pub fn initiate_pool_config(ctx: Context<InitiatePool>, validator: Pubkey) -> Result<()> {
        initiate_pool(ctx, validator)
    }

    pub fn undelegate_pool_stake(ctx: Context<Undelegate>) -> Result<()> {
        undelegate(ctx)
    }

    pub fn start_withdraw_stake(ctx: Context<StartWithdraw>) -> Result<()> {
        start_withdraw(ctx)
    }

    pub fn deposit_stake(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        deposit(ctx, amount)
    }

    pub fn finalize_withdraw_stake(ctx: Context<FinalizeWithdraw>) -> Result<()> {
        finalize_withdraw(ctx)
    }

    pub fn view_current_user_rewards(ctx: Context<ViewUserRewards>) -> Result<crate::types::StakingStats> {
        view_user_rewards(ctx)
    }

    pub fn view_total_pool_stats(ctx: Context<ViewPoolStats>) -> Result<crate::types::StakingStats> {
        view_pool_stats(ctx)
    }
}
