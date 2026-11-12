# Fan Chart
# Question: What might enrollment be over the next five years, and how sure can we be?
# Put this script and fan.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.

library(tidyverse)

# ---- Gallery look: dark background, soft gray text ----
font <- "IBM Plex Sans"   # use "sans" if IBM Plex Sans is not installed
ink  <- "#8B97A7"

theme_gallery <- function() {
  theme_minimal(base_size = 16, base_family = font) +
    theme(
      plot.background  = element_rect(fill = "#161B23", color = NA),
      panel.grid       = element_line(color = "#222A34"),
      panel.grid.minor = element_blank(),
      text             = element_text(color = ink),
      axis.text        = element_text(color = ink),
      legend.position  = "top",
      legend.title     = element_blank(),
      plot.margin      = margin(24, 28, 18, 18)
    )
}

df <- read_csv("fan.csv", show_col_types = FALSE)

# A simple forecast: keep the average yearly change going, and let the
# uncertainty grow with each step, based on how much past changes varied
changes <- diff(df$students)
drift   <- mean(changes)
spread  <- sd(changes)
last    <- tail(df, 1)

fc <- tibble(step = 1:5) |>
  mutate(year     = last$year + step,
         center   = last$students + drift * step,
         lo95 = center - 1.96 * spread * sqrt(step), hi95 = center + 1.96 * spread * sqrt(step),
         lo80 = center - 1.28 * spread * sqrt(step), hi80 = center + 1.28 * spread * sqrt(step),
         lo50 = center - 0.67 * spread * sqrt(step), hi50 = center + 0.67 * spread * sqrt(step))

# Start every band at the last real year so the fan opens from that point
fc <- bind_rows(tibble(year = last$year, center = last$students,
                       lo95 = last$students, hi95 = last$students, lo80 = last$students,
                       hi80 = last$students, lo50 = last$students, hi50 = last$students), fc)

p <- ggplot() +
  geom_ribbon(data = fc, aes(x = year, ymin = lo95, ymax = hi95), fill = "#F0B95A", alpha = 0.18) +
  geom_ribbon(data = fc, aes(x = year, ymin = lo80, ymax = hi80), fill = "#F0B95A", alpha = 0.28) +
  geom_ribbon(data = fc, aes(x = year, ymin = lo50, ymax = hi50), fill = "#F0B95A", alpha = 0.45) +
  geom_line(data = fc, aes(x = year, y = center), color = "#F0B95A", linetype = "dashed", linewidth = 1) +
  geom_line(data = df, aes(x = year, y = students), color = "#E8EDF4", linewidth = 1.3) +
  geom_point(data = df, aes(x = year, y = students), color = "#E8EDF4", size = 2) +
  annotate("text", x = last$year + 5.2, y = c(max(fc$hi95), max(fc$hi50)) ,
           label = c("95% band", "50% band"), hjust = 0, vjust = 0.5, color = ink, family = font, size = 4) +
  scale_x_continuous(breaks = seq(2010, 2030, 2), expand = expansion(add = c(0.4, 2.4))) +
  scale_y_continuous(labels = scales::comma) +
  labs(x = NULL, y = "Students enrolled",
       caption = "Solid line: real history. Dashed line: middle guess. Shading: ranges, not promises. Sample values.") +
  theme_gallery() +
  theme(plot.caption = element_text(color = ink, hjust = 0))

ggsave("fan.png", p, width = 9, height = 6, dpi = 200)
p
