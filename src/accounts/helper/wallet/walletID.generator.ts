export class walletIDGenerator  {
    generate(){
        var walletID
        var WalletNum = "298"
        var GenerateWalletID = Math.floor(Math.random() *  10000000) + 99999999
        walletID = String(WalletNum) +  String(GenerateWalletID)   
        return walletID 
    }
}