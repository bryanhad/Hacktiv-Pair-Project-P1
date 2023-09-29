const splitCamelCase = require("../helper/splitCamelCase")
const { Attorney, Creditor, Trustee } = require("../models")

module.exports = class CreditorController {
    static GET_form(req, res) {
        const { user } = req.session

        const { validation } = req.query
        let parsedValidation

        if (validation) {
            parsedValidation = JSON.parse(validation)
            // return res.send(parsedValidation)
        }

        res.render("creditorPages/registerForm", {
            splitCamelCase,
            validation: parsedValidation,
            user,
        })
    }

    static POST_newCreditor(req, res) {
        const trusteeUsername = req.session.user.username
        let newAttorneyId
        // return res.send(req.body)
        const {
            firstName,
            lastName,
            email,
            domicile,
            phone,
            claimType,
            claimAmount,
            spt,
            idCardCopy,
            powerOfAttorney,
            attorneyName,
            attorneyEmail,
            attorneyPhone,
            attorneyIdCard,
        } = req.body

        const creditorData = {
            firstName,
            lastName,
            email,
            domicile,
            phone,
            claimType,
            claimAmount,
            spt,
            idCardCopy,
            powerOfAttorney,
        }

        const [attorneyFirstName, attorneyLastName] = attorneyName.split(" ")
        const attorneyData = {
            firstName: attorneyFirstName,
            lastName: attorneyLastName,
            email: attorneyEmail,
            phone: attorneyPhone,
            idCardCopy: attorneyIdCard,
        }

        Attorney.create(attorneyData)
            .then((newAttorney) => {
                newAttorneyId = newAttorney.id

                return Trustee.findOne({ where: { username: trusteeUsername } })
            })
            .then((trustee) => {
                return Creditor.create({
                    ...creditorData,
                    AttorneyId: newAttorneyId,
                    TrusteeId: trustee.id,
                })
            })
            .then((newCreditor) => {
                res.redirect("/details")
                // res.send(newCreditor)
            })
            .catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    const errorsArr = err.errors.map((errObj) => {
                        const { message, path } = errObj
                        return { inputName: path, message }
                    })
                    const formInputObj = err.errors[0].instance.dataValues
                    delete formInputObj.id
                    delete formInputObj.updatedAt
                    delete formInputObj.createdAt

                    // console.log(formInputObj)
                    // return res.send(formInputObj)

                    for (const key in formInputObj) {
                        formInputObj[key] = {
                            prevValue: formInputObj[key],
                        }
                        const errorObj = errorsArr.find(
                            (obj) => obj.inputName === key
                        )
                        if (errorObj) {
                            formInputObj[key] = {
                                ...formInputObj[key],
                                errorMessage: errorObj.message,
                            }
                        } else {
                            console.log({ key: formInputObj[key] })
                            if (
                                [
                                    "spt",
                                    "idCardCopy",
                                    "powerOfAttorney",
                                ].includes(key)
                            ) {
                                if (formInputObj[key].prevValue === undefined) {
                                    formInputObj[key].prevValue = false
                                }
                            }
                        }
                    }
                    res.redirect(
                        `/trustee/add-creditor?validation=${JSON.stringify(
                            formInputObj
                        )}`
                    )
                } else {
                    console.log(err)
                    res.send(err)
                }
            })
    }

    static GET_deleteCreditor(req, res) {
        const { creditorId } = req.params

        Creditor.destroy({ where: { id: +creditorId } })
            .then((deletedCreditor) => {
                res.redirect("/details")
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static GET_formEditCreditor(req, res) {
        const { creditorId } = req.params
        const { validation } = req.query
        let parsedValidation
        let foundCreditor

        if (validation) {
            parsedValidation = JSON.parse(validation)
        }

        Creditor.findOne({
            where: { id: creditorId }
        }).then((creditor) => {
            foundCreditor = creditor
            return Attorney.findOne({where: {id: creditor.AttorneyId}})
        })
        .then(attorney => {
            console.log({foundCreditor, attorney})
            return res.send({foundCreditor, attorney})

        // console.log(employee.dataValues.Store.dataValues)
        // return res.send('bebek')
        //     const store = employee.dataValues.Store
        //     const employeeFullName = `${employee.firstName} ${employee.lastName}`
        //     const employeeObj = employee.dataValues
        //     delete employeeObj.id
        //     delete employeeObj.StoreId
        //     delete employeeObj.createdAt
        //     delete employeeObj.updatedAt
        //     delete employeeObj.Store

        //     for (const key in employeeObj) {
        //         if (key === "dateOfBirth") {
        //             employeeObj[key] = {
        //                 prevValue: formatDateToString(employeeObj.dateOfBirth),
        //             }
        //         } else {
        //             employeeObj[key] = {
        //                 prevValue: employeeObj[key],
        //             }
        //         }
        //     }
        //     const willBePassedToValidation = validation
        //         ? parsedValidation
        //         : employeeObj

        //     res.render("formEditEmployee", {
        //         tabTitle: `Edit ${employeeFullName}`,
        //         validation: willBePassedToValidation,
        //         employee: { fullName: employeeFullName, id: employeeId },
        //         store,
        //         formatDateToString,
        //     })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }
}
