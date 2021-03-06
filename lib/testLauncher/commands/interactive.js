/**
 * 'interactive' test launcher command
 */
const {promptPassword, mergeConfigs} = require('../../utils/testLauncherHelper');
const SuitestLauncher = require('../SuitestLauncher');
const {hideOwnArgs} = require('../processArgs');
const texts = require('../../texts');
const {launcherParams, override} = require('../../../config');
const logLevels = require('../../constants/logLevels');

const command = 'interactive';

const describe = 'Run defined test command a single time in interactive session mode on a single device. '
	+ 'It\'s intended for test authoring and application debugging.';

const builder = yargs => {
	yargs
		.option('username', {
			alias: 'u',
			describe: 'E-mail you\'re using to login to Suitest',
			global: false,
		})
		.option('password', {
			alias: 'p',
			describe: 'Password for your Suitest account.',
			global: false,
		})
		.option('org-id', {
			alias: 'o',
			describe: 'Id of the organisation you want to log in into',
			global: false,
		})
		.option('device-id', {
			alias: 'd',
			describe: 'Device you want to connect to',
			global: false,
		})
		.option('app-config-id', {
			alias: 'c',
			describe: 'Application configuration id to launch the app with',
			global: false,
		})
		.option('log-dir', {
			describe: texts['tl.logDirDescription'](),
			global: false,
		})
		.option('inspect', {
			describe: 'Will launch user command with --inspect execArgv, used for debugging',
			global: false,
		})
		.option('inspect-brk', {
			describe: 'Will launch user command with --inspect-brk execArgv, used for debugging',
			global: false,
		})
		.option('disallow-crash-reports', {
			describe: texts.cliDisallowCrashReports(),
			global: false,
			type: 'boolean',
		})
		.option('log-level', {
			describe: texts.cliLogLevel(),
			global: false,
			choices: Object.values(logLevels),
		})
		.option('continue-on-fatal-error', {
			describe: texts.cliContinueOnFatalError(),
			default: false,
			global: false,
			type: 'boolean',
		});
};

const handler = async(argv) => {
	const ownArgs = mergeConfigs(launcherParams, argv);

	ownArgs.password = ownArgs.password || await promptPassword();
	override(ownArgs);

	const userCommandArgs = hideOwnArgs();
	const suitestLauncher = new SuitestLauncher(ownArgs, userCommandArgs);

	await suitestLauncher.runInteractiveSession();
};

module.exports = {
	command,
	describe,
	builder,
	handler,
};
