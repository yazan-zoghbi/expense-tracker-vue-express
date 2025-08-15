import { reactive, onMounted } from "vue";

type ColorKeys =
  | "primary"
  | "primaryDark"
  | "primaryLight"
  | "background"
  | "surface"
  | "border"
  | "text"
  | "textMuted"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

type Colors = Record<ColorKeys, string>;

export function useColors() {
  const colors = reactive<Colors>({
    primary: "",
    primaryDark: "",
    primaryLight: "",
    background: "",
    surface: "",
    border: "",
    text: "",
    textMuted: "",
    accent: "",
    success: "",
    warning: "",
    error: "",
    info: "",
  });

  const loadColors = () => {
    const root = getComputedStyle(document.documentElement);
    const map: Record<ColorKeys, string> = {
      primary: "--color-primary",
      primaryDark: "--color-primary-dark",
      primaryLight: "--color-primary-light",
      background: "--color-background",
      surface: "--color-surface",
      border: "--color-border",
      text: "--color-text",
      textMuted: "--color-text-muted",
      accent: "--color-accent",
      success: "--color-success",
      warning: "--color-warning",
      error: "--color-error",
      info: "--color-info",
    };

    for (const key in map) {
      const cssVar = map[key as ColorKeys];
      colors[key as ColorKeys] = root.getPropertyValue(cssVar).trim() || "";
    }
  };

  onMounted(loadColors);

  return { colors };
}
