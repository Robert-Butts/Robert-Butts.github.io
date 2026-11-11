# Parallel Coordinates
# Question: How do programs compare across cost, size, retention, and rating?
# Put this script and parallel.csv in the same folder, then in RStudio choose
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

highlight <- "Music"

df <- read_csv("parallel.csv", show_col_types = FALSE)

# Reshape to one row per program per measure, then scale each measure 0 to 1
long <- df |>
  pivot_longer(-program, names_to = "measure", values_to = "value") |>
  group_by(measure) |>
  mutate(scaled = (value - min(value)) / (max(value) - min(value))) |>
  ungroup() |>
  mutate(measure = factor(measure, levels = names(df)[-1]))

p <- ggplot(long, aes(x = measure, y = scaled, group = program)) +
  geom_vline(xintercept = 1:4, color = "#2E3845") +
  geom_line(data = filter(long, program != highlight), color = "#5A6575", linewidth = 0.8) +
  geom_line(data = filter(long, program == highlight), color = "#F0B95A", linewidth = 1.8) +
  scale_x_discrete(labels = c("Cost", "Students", "Retention", "Rating"),
                   expand = expansion(add = 0.2)) +
  scale_y_continuous(breaks = c(0, 1), labels = c("Lowest", "Highest")) +
  labs(x = NULL, y = NULL, caption = paste("Gold line:", highlight)) +
  theme_gallery() +
  theme(panel.grid = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("parallel.png", p, width = 9, height = 6, dpi = 200)
p
