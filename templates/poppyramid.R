# Population Pyramid
# Question: How do age bands compare between online and on-campus students?
# Put this script and poppyramid.csv in the same folder, then in RStudio choose
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

pal <- c("On campus" = "#7FD18C", "Online" = "#B79CFF")

df <- read_csv("poppyramid.csv", show_col_types = FALSE) |>
  mutate(age_band = fct_inorder(age_band)) |>          # keep the order from the file
  group_by(format) |>
  mutate(share = students / sum(students)) |>          # share of each group, not raw counts
  ungroup() |>
  mutate(plot_share = if_else(format == "On campus", -share, share))   # on campus to the left

widest <- max(df$share) * 1.05   # the same reach on both sides keeps one shared scale

p <- ggplot(df, aes(x = plot_share, y = age_band, fill = format)) +
  geom_col(width = 0.82) +
  geom_vline(xintercept = 0, color = "#161B23", linewidth = 1) +
  # both sides use one scale, so equal bar lengths mean equal shares
  scale_x_continuous(labels = function(x) scales::percent(abs(x)), limits = c(-widest, widest),
                     breaks = seq(-0.4, 0.4, 0.1)) +
  scale_fill_manual(values = pal, name = NULL) +
  labs(x = "Share of each group's students", y = "Age",
       caption = "On campus left, online right. Both sides add to 100%. Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("poppyramid.png", p, width = 9, height = 6, dpi = 200)
p
