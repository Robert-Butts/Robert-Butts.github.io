# Spine Chart
# Question: What share of each program's students are full time and part time?
# Put this script and spine.csv in the same folder, then in RStudio choose
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

pal <- c("Part time" = "#F2716F", "Full time" = "#75AADB")

df <- read_csv("spine.csv", show_col_types = FALSE) |>
  mutate(total       = full_time + part_time,
         `Full time` = full_time / total,
         `Part time` = -part_time / total,          # negative, so it extends left
         program     = fct_reorder(program, `Full time`)) |>
  pivot_longer(c(`Part time`, `Full time`), names_to = "side", values_to = "share")

p <- ggplot(df, aes(x = share, y = program, fill = side)) +
  geom_col(width = 0.68) +
  geom_vline(xintercept = 0, color = "#E8EDF4", linewidth = 0.8) +
  # each share is written just past the outer end of its half
  geom_text(aes(label = scales::percent(abs(share), accuracy = 1),
                hjust = if_else(share > 0, -0.2, 1.2)),
            color = "#E8EDF4", family = font, size = 4.4) +
  scale_x_continuous(labels = function(x) scales::percent(abs(x)), limits = c(-1, 1),
                     breaks = seq(-1, 1, by = 0.5)) +
  scale_fill_manual(values = pal, breaks = c("Part time", "Full time")) +
  labs(x = "Share of the program's students", y = NULL,
       caption = "Each bar adds up to 100%. Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("spine.png", p, width = 9, height = 6, dpi = 200)
p
