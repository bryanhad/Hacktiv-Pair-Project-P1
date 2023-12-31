"use strict"
const { Model } = require("sequelize")
const dateToString = require("../helper/dateToStringArr")

module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {
        static associate(models) {
            this.belongsTo(models.Trustee)
        }

        static getAllWithDetail(Trustee, Profile) {
            return this.findAll({
                attributes: {
                    exclude: ['TrusteeId']
                },
                include: {
                    model: Trustee, attributes: ['id', 'username'], include: {
                        model: Profile, attributes: ['firstName', 'lastName', 'imageUrl']
                }}
            })
        }

        static getOneWithDetail(Trustee, Profile, id) {
            return this.findOne({
                where: {id},
                attributes: {
                    exclude: ['TrusteeId']
                },
                include: {
                    model: Trustee, attributes: ['id', 'username'], include: {
                        model: Profile, attributes: ['firstName', 'lastName', 'imageUrl']
                }}
            })
        }

        createdDate() {
            return dateToString(this.createdAt).date
        }

        get createdTime() {
            return dateToString(this.createdAt).time
        }

        get writersFullName() {
            return this.Trustee.fullName
        }

        get writersProfilePicture() {
            return this.Trustee.profilePicture
        }

        bodyToArray() {
            return this.body.split('\n\n')
        }
    }
    Blog.init(
        {
            title: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
            body: DataTypes.TEXT,
            TrusteeId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Blog",
        }
    )
    return Blog
}
