module.exports=(sequelize,DataType)=>{
    const niveau= sequelize.define("niveau",{
        designation:{
            type:DataType.STRING,
            allowNull : false

        },
        acronyme:{
            type:DataType.STRING,
            allowNull : false

        }
    })  
    niveau.associate=models=>{
        niveau.hasMany(models.classe)
       // niveau.belongsTo(models.formation)
        niveau.belongsTo(models.formation, {
            foreignKey: "formationId",
            as: "formation",
          });
    }
    return niveau
    
}    