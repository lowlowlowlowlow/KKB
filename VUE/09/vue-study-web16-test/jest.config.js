//单独配置jest
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  //收集src文件夹下的任意文件，以js、vue结尾
  collectCoverageFrom: ['src/**/*.{js,vue}']
}
