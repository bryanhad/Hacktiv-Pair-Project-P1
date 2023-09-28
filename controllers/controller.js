const { Admin,Attorney,Blog,Creditor,Profile,Trustee } = require("../models");
const sequelize = require("sequelize")
const { Op } = require("sequelize");
const creditor = require("../models/creditor");

class Controller {
  static GET_homePage(req, res) {
    Blog.findAll()
      .then((blogs) => {
        res.render("homePage", { blogs });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static GET_detailsPage(req, res) {
    let creditorsArr

    Creditor.findAll({
      include: {model: Attorney, attributes: ['firstName', 'lastName']}
    })
      .then((creditors) => {
        creditorsArr = creditors
        return Creditor.findAll({attributes:[[sequelize.fn('sum', sequelize.col('claimAmount')), 'totalClaimAmount']]})
      })
      .then(totalClaimAmount => {
        const totalClaimCreditors = totalClaimAmount[0].dataValues.totalClaimAmount

        res.render("detailsGuestPage", {creditorsArr, totalClaimCreditors})
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static GET_trusteeDetailsPage(req, res){
    let creditorsArr

    Creditor.findAll({
      include: {model: Attorney, attributes: ['firstName', 'lastName']}
    })
      .then((creditors) => {
        creditorsArr = creditors
        return Creditor.findAll({attributes:[[sequelize.fn('sum', sequelize.col('claimAmount')), 'totalClaimAmount']]})
      })
      .then(totalClaimAmount => {
        const totalClaimCreditors = totalClaimAmount[0].dataValues.totalClaimAmount

        res.render("trusteePages/trusteeDetails", {creditorsArr, totalClaimCreditors})
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static GET_formAddCreditor(req, res){
        Creditor.findOne({include: {model: Attorney}})
        .then((result) => {
          res.render("addEmployee",{result})
      })

        .catch((err) => {
            console.log(err);
            res.send(err)
        })
  }
}
module.exports = Controller;
