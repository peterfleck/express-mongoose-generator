/**
 * Module dependencies
 */
var ft = require("./fileTools");
var formatTools = require("./formatTools");
var os = require("os");

/**
 * Generate a Mongoose model
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateModel(path, modelName, modelFields, generateMethod, ts, cb) {
    var fields = formatTools.getFieldsForModelTemplate(modelFields);
    var schemaName = modelName + "Schema";

    var extension = ts ? "ts" : "js";
    var model = ft.loadTemplateSync("model." + extension);
    model = model.replace(
        /{modelName}/,
        formatTools.capitalizeFirstLetter(modelName)
    );
    model = model.replace(/{schemaName}/g, schemaName);
    model = model.replace(/{fields}/, fields);

    if (generateMethod === "t") {
        ft.createDirIfIsNotDefined(path, "models", function () {
            ft.writeFile(
                path + "/models/" + modelName + ".model." + extension,
                model,
                null,
                cb
            );
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            ft.writeFile(
                path +
                    "/" +
                    modelName +
                    "/" +
                    modelName +
                    ".model." +
                    extension,
                model,
                null,
                cb
            );
        });
    }
}

/**
 * Generate a Express router
 * @param {string} path
 * @param {string} modelName
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateRouter(path, modelName, generateMethod, ts, cb) {
    var extension = ts ? "ts" : "js";
    var router = ft.loadTemplateSync("router." + extension);
    router = router.replace(/{controllerName}/g, modelName + ".controller");
    router = router.replace(
        /{modelNamePlural}/g,
        formatTools.pluralize(modelName)
    );
    router = router.replace(
        /{modelNameCap}/g,
        formatTools.capitalizeFirstLetter(modelName)
    );
    router = router.replace(/{modelName}/g, modelName);

    if (generateMethod === "t") {
        ft.createDirIfIsNotDefined(path, "routes", function () {
            router = router.replace(
                /{controllerPath}/g,
                "'../controllers/" + modelName + "Controller." + extension + "'"
            );
            ft.writeFile(
                path + "/routes/" + modelName + "Routes." + extension,
                router,
                null,
                cb
            );
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            router = router.replace(
                /{controllerPath}/g,
                "'./" + modelName + ".controllers." + extension + "'"
            );
            ft.writeFile(
                path +
                    "/" +
                    modelName +
                    "/" +
                    modelName +
                    ".routes." +
                    extension,
                router,
                null,
                cb
            );
        });
    }
}

/**
 * Generate Controller
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateController(
    path,
    modelName,
    modelFields,
    generateMethod,
    ts,
    cb
) {
    var extension = ts ? "ts" : "js";
    var controller = ft.loadTemplateSync("controller." + extension);

    var updateFields = "";
    var createFields = os.EOL;

    modelFields.forEach(function (f, index, fields) {
        var field = f.name;

        updateFields +=
            modelName +
            "." +
            field +
            " = req.body." +
            field +
            " ? req.body." +
            field +
            " : " +
            modelName +
            "." +
            field +
            ";";
        updateFields += os.EOL + "\t\t\t";

        createFields += "\t\t\t" + field + " : req.body." + field;
        createFields += fields.length - 1 > index ? "," + os.EOL : "";
    });

    controller = controller.replace(
        /{modelName}/g,
        formatTools.capitalizeFirstLetter(modelName)
    );
    controller = controller.replace(/{name}/g, modelName);
    controller = controller.replace(
        /{pluralName}/g,
        formatTools.pluralize(modelName)
    );
    controller = controller.replace(
        /{controllerName}/g,
        modelName + "Controller"
    );
    controller = controller.replace(/{createFields}/g, createFields);
    controller = controller.replace(/{updateFields}/g, updateFields);

    if (generateMethod === "t") {
        ft.createDirIfIsNotDefined(path, "controllers", function () {
            controller = controller.replace(
                /{modelPath}/g,
                "'../models/" + modelName + "Model." + extension + "'"
            );
            ft.writeFile(
                path + "/controllers/" + modelName + "Controller." + extension,
                controller,
                null,
                cb
            );
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            controller = controller.replace(
                /{modelPath}/g,
                "'./" + modelName + ".model." + extension + "'"
            );
            ft.writeFile(
                path +
                    "/" +
                    modelName +
                    "/" +
                    modelName +
                    ".controllers." +
                    extension,
                controller,
                null,
                cb
            );
        });
    }
}

function generateValidator(
    path,
    modelName,
    modelFields,
    generateMethod,
    ts,
    cb
) {
    var dataFields = formatTools.getFieldsForValidatorTemplate(modelFields);
    var schemaFields = formatTools.getFieldsForValidatorSchemaTemplate(
        modelFields
    );
    var schemaName = modelName + "Schema";

    var extension = ts ? "ts" : "js";
    var validator = ft.loadTemplateSync("validator." + extension);
    validator = validator.replace(
        /{modelName}/,
        formatTools.capitalizeFirstLetter(modelName)
    );

    validator = validator.replace(
        /{modelPath}/g,
        "./" + modelName + ".model." + extension
    );
    validator = validator.replace(/{schemaName}/g, schemaName);
    validator = validator.replace(/{dataFields}/, dataFields);
    validator = validator.replace(/{schemaFields}/, schemaFields);

    if (generateMethod === "t") {
        ft.createDirIfIsNotDefined(path, "validators", function () {
            ft.writeFile(
                path + "/models/" + modelName + ".validator." + extension,
                model,
                null,
                cb
            );
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            ft.writeFile(
                path +
                    "/" +
                    modelName +
                    "/" +
                    modelName +
                    ".validator." +
                    extension,
                validator,
                null,
                cb
            );
        });
    }
}

function generateSvelteComponent(
    path,
    modelName,
    modelFields,
    generateMethod,
    ts,
    cb
) {
    var fields = formatTools.getFieldsForModelTemplate(modelFields);
    var schemaName = modelName + "Schema";

    var model = ft.loadTemplateSync("component.svelte");
    model = model.replace(
        /{modelNamePluralCap}/g,
        formatTools.capitalizeFirstLetter(formatTools.pluralize(modelName))
    );
    model = model.replace(
        /{modelNamePlural}/g,
        formatTools.pluralize(modelName)
    );
    model = model.replace(
        /{modelNameCap}/g,
        formatTools.capitalizeFirstLetter(modelName)
    );
    model = model.replace(/{modelName}/g, modelName);
    model = model.replace(/{schemaName}/g, schemaName);
    model = model.replace(/{fields}/g, fields);

    if (generateMethod === "t") {
        ft.createDirIfIsNotDefined(path, "components", function () {
            ft.writeFile(
                path + "/components/" + modelName + ".svelte",
                model,
                null,
                cb
            );
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            ft.writeFile(
                path + "/" + modelName + "/" + modelName + ".svelte",
                model,
                null,
                cb
            );
        });
    }
}

module.exports = {
    generateModel: generateModel,
    generateRouter: generateRouter,
    generateController: generateController,
    generateValidator: generateValidator,
    generateSvelteComponent: generateSvelteComponent,
};
