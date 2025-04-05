use anchor_lang::prelude::*;

#[account]
pub struct StakingPool {
    pub validator: Pubkey,
    pub bump: u8,
    pub total_staked: u64,
    pub total_shares: u64,
}

#[account]
pub struct UserStake {
    pub user: Pubkey,
    pub amount_staked: u64,
    pub shares: u64,
}
