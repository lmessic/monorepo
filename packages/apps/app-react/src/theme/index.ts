// 定义可用的主题名称常量
export const Theme = ["nord", "solarizedDark", "solarizedLight"] as const;

// 导出主题类型联合类型
export type ThemeType = (typeof Theme)[number];
