const fs = require('fs');
const request = require('request');

var params = {
    report_path: process.env.REPORT_PATH || "D:\\WS PROJECTS\\PDI\\testes postman\\newman\\",
    project: process.env.PROJECT || "btb",
    metric: process.env.METRIC || "critical_path",
    kvasir_address: process.env.KVASIR_ADDRESS || "http://localhost:3000/api/v1/kvasir/sonarqube"
}

params.report_file = process.env.REPORT_FILE || getReportFile();

/**
 * Return the last file in the directory
 */
function getReportFile() {
    const files = fs.readdirSync(params.report_path)
    const recent = files[files.length - 1]
    return recent
}

const file = fs.readFileSync(params.report_path + params.report_file, 'utf8');
const report = JSON.parse(file);
const assertion = report.run.stats.assertions;

const metricTest = {
    "projectName": params.project,
    "conditions": [{
        "metric": params.metric,
        "op": "LT",
        "warning": 1,
        "error": "1",
        "actual": assertion.failed,
        "level": assertion.failed === 0 ? 'OK' : 'ERROR'
    }]
};

request.post(params.kvasir_address, {
    json: metricTest
},
    (error, response, body) => {
        if (response && response.statusCode === 201) {
            console.info(`Request made sucessfully to ${params.kvasir_address}\n`, metricTest);
        } else {
            console.error(`An error occurred during the request\nError: ${error}\nResponse:`, body);
        }
    }
);
