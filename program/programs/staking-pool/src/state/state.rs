use anchor_lang::prelude::*;

#[account]
pub struct StakingPool {
    pub validator: Pubkey,     
    pub bump: u8,             
    pub total_staked: u64,     
    pub total_shares: u64,     
}

impl StakingPool {
    pub const SIZE: usize = 32 + 1 + 8 + 8; 
}

#[account]
pub struct UserStake {
    pub user: Pubkey,          
    pub amount_staked: u64,    
    pub shares: u64,           
    pub withdraw_requested_at: Option<u64>,
}

impl UserStake {
    pub const SIZE: usize = 32 + 8 + 8; 
}
