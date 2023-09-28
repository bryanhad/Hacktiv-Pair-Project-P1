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

        // return res.send(creditorsArr)
        // console.log(creditorsArr[0].attorneyFullName, '<<<<<<')
        res.render("trusteePages/trusteeDetails", {creditorsArr, totalClaimCreditors})
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static GET_formAddCreditor(req, res){
        Creditor.findAll()
          res.render("trusteePages/formAddCreditor")
        .catch((err) => {
            console.log(err);
            res.send(err)
    })
  }
  static POST_formAddCreditor(req,res){
    // return res.send(res.body)
    const {firstName, lastName, email, domicile, phone, claimAmount, spt, idCardCopy, powerOfAttorney, attorneyName, attorneyEmail, attorneyPhone, attorneyIdCard} = req.body
    const creditorData = {firstName, lastName, email, domicile, phone, claimAmount, spt, idCardCopy, powerOfAttorney}
    const [attorneyFirstName, attorneyLastName] = attorneyName.split(" ")
    const attorneyData = {firstName: attorneyFirstName, lastName: attorneyLastName, email:attorneyEmail, phone: attorneyPhone, idCardCopy:attorneyIdCard}
    
    Attorney.create(attorneyData)
      .then(newAttorney => {
        const newAttorneyId = newAttorney.id

        return Creditor.create({...creditorData, AttorneyId:newAttorneyId})
      })
      .then(newCreditor => {
        res.send(newCreditor)
      })
      .catch((err) => {
        console.log(err);
        res.send(err)
      })
  }
}
  
module.exports = Controller;
