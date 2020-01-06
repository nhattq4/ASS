// eslint-disable-next-line no-undef
var getEnvironmentSetting = async () => {
    let databaseAccount;

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    console.log('Init - Start on environment:' + process.env.NODE_ENV);

    switch (process.env.NODE_ENV) {
        case 'development':
            databaseAccount = await JSON.stringify(require('../../config/keys/dev/databaseAccount.json'));
            break;
        case 'staging':
            break;
        case 'production':
            break;
        default:
            databaseAccount = await JSON.stringify(require('../../config/keys/local/databaseAccount.json'));
            break;
    }

    // eslint-disable-next-line require-atomic-updates
    process.env.databaseAccount = databaseAccount;

    console.log('Init - Start on environment successfully.');
};

module.exports = {
    getEnvironmentSetting: getEnvironmentSetting
};
