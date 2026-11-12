# Diverging Bar Chart
# Question: Which programs gained or lost students compared with last year?
# Put this script and divergingbar.csv in the same folder, then in RStudio choose
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

pal <- c("Gained" = "#75AADB", "Lost" = "#F2716F")

df <- read_csv("divergingbar.csv", show_col_types = FALSE) |>
  mutate(change    = this_year - last_year,
         direction = if_else(change >= 0, "Gained", "Lost"),
         program   = fct_reorder(program, change))   # sort by the size of the change

p <- ggplot(df, aes(x = change, y = program, fill = direction)) +
  geom_col(width = 0.68) +
  geom_vline(xintercept = 0, color = "#E8EDF4", linewidth = 0.6) +
  # labels sit just past the end of each bar, on whichever side it grows
  geom_text(aes(label = scales::number(change, style_positive = "plus"),
                hjust = if_else(change >= 0, -0.25, 1.25)),
            color = "#E8EDF4", family = font, size = 4.4) +
  scale_x_continuous(expand = expansion(mult = 0.14)) +
  scale_fill_manual(values = pal) +
  labs(x = "Change in students since last year", y = NULL,
       caption = "Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("divergingbar.png", p, width = 9, height = 6, dpi = 200)
p
