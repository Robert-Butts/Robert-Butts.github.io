# Barcode Plot
# Question: Where does every course's enrollment fall along one axis?
# Put this script and barcode.csv in the same folder, then in RStudio choose
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

df <- read_csv("barcode.csv", show_col_types = FALSE) |>
  mutate(level = fct_rev(fct_inorder(level)))   # 100 level at the top

p <- ggplot(df, aes(x = enrollment, y = level)) +
  # each course is one thin, see-through line; dense spots look solid
  geom_point(shape = "|", size = 16, color = "#7FD18C", alpha = 0.55) +
  scale_x_continuous(breaks = seq(0, 240, 40)) +
  labs(x = "Students enrolled", y = NULL,
       caption = "Each line is one course. Where lines merge, many courses share a size. Sample values.") +
  theme_gallery() +
  theme(panel.grid.major.y = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("barcode.png", p, width = 9, height = 6, dpi = 200)
p
