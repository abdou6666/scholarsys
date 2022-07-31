module.exports=(sequelize,DataType)=>{
    const salle= sequelize.define("salle",{
        designation:{
            type:DataType.STRING,
            allowNull : false

        }
    })  
   
    return salle
    
}    