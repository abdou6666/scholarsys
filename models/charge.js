module.exports=(sequelize,DataType)=>{
    const charge= sequelize.define("charge",{
        designation:{
            type:DataType.STRING,
            allowNull : false

        },
        code_facture:{
            type:DataType.STRING,
            allowNull : false

        },
        montant_facture:{
            type:DataType.INTEGER,
            allowNull : false

        },
        date_ajout:{
            type:DataType.DATE,
            allowNull : false

        }
    })  
    
    return charge
    
}    