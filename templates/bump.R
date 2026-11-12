# Bump Chart
# Question: How did the top five majors trade places over ten years?
# Put this script and bump.csv in the same folder, then in RStudio choose
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

pal <- c("Business" = "#F0B95A", "Biology" = "#7FD18C", "Psychology" = "#B79CFF",
         "Computer Science" = "#75AADB", "Nursing" = "#F38ABE")

df <- read_csv("bump.csv", show_col_types = FALSE) |>
  group_by(year) |>
  mutate(rank = rank(-students, ties.method = "first")) |>   # 1 = most students that year
  ungroup()

p <- ggplot(df, aes(x = year, y = rank, color = major)) +
  geom_line(linewidth = 2.2) +
  geom_point(size = 5) +
  geom_text(data = filter(df, year == min(year)), aes(label = major),
            hjust = 1, nudge_x = -0.35, family = font, size = 4.4) +
  geom_text(data = filter(df, year == max(year)), aes(label = major),
            hjust = 0, nudge_x = 0.35, family = font, size = 4.4) +
  scale_y_reverse(breaks = 1:5, labels = paste0("#", 1:5)) +
  scale_x_continuous(breaks = seq(2016, 2025, 1), expand = expansion(add = c(3.3, 3.0))) +
  scale_color_manual(values = pal, guide = "none") +
  labs(x = NULL, y = NULL,
       caption = "Rank shows order only. A close race and a big lead look the same. Sample values.") +
  theme_gallery() +
  theme(panel.grid.minor = element_blank(), panel.grid.major.x = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("bump.png", p, width = 9, height = 6, dpi = 200)
p
