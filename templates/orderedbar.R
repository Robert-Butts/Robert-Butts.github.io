# Ordered Bar Chart
# Question: Which ten programs award the most degrees?
# Put this script and orderedbar.csv in the same folder, then in RStudio choose
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

df <- read_csv("orderedbar.csv", show_col_types = FALSE) |>
  slice_max(degrees, n = 10) |>                        # keep the top ten
  mutate(program = fct_reorder(program, degrees))      # largest at the top

p <- ggplot(df, aes(x = degrees, y = program)) +
  geom_col(fill = "#75AADB", width = 0.7) +
  geom_text(aes(label = scales::comma(degrees)), hjust = -0.25,
            color = "#E8EDF4", family = font, size = 4.4) +
  scale_x_continuous(expand = expansion(mult = c(0, 0.1))) +
  labs(x = "Degrees awarded", y = NULL, caption = "Top ten of 14 programs. Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("orderedbar.png", p, width = 9, height = 6, dpi = 200)
p
