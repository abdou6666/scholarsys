module.exports=(sequelize,DataType)=>{
    const formation= sequelize.define("formation",{
        nom:{
            type:DataType.STRING,
            allowNull : false

        },
        montant_anuelle:{
            type:DataType.INTEGER,
            allowNull : false

        },
        duree_anuelle:{
            type:DataType.INTEGER,
            allowNull : false

        },
        duree_mensuelle:{
            type:DataType.INTEGER,
            allowNull : false

        },
        date_echeance:{
            type:DataType.DATE,
            allowNull : false

        }
    })  
    formation.associate=models=>{
        formation.hasMany(models.niveau)
      
    }
    return formation
    
}    