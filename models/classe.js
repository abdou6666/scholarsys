module.exports=(sequelize,DataType)=>{
    const classe= sequelize.define("classe",{
        nom:{
            type:DataType.STRING,
            allowNull : false

        },
        designation:{
            type:DataType.STRING,
            allowNull : false

        }
    })  
    classe.associate=models=>{
        classe.belongsTo(models.niveau)
    }
    return classe
    
}    