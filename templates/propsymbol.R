# Proportional Symbol Chart
# Question: How large is each campus's student body, roughly?
# Put this script and propsymbol.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.

library(tidyverse)

# ---- Gallery look: dark background, soft gray text ----
font <- "IBM Plex Sans"   # use "sans" if IBM Plex Sans is not installed
ink  <- "#8B97A7"

theme_gallery <- function() {
  theme_minimal(base_size = 16, base_family = font) +
    theme(
      plot.background  = element_rect(fill = "#161B23", color = NA),
      panel.grid.major = element_line(color = "#222A34"),
      panel.grid.minor = element_blank(),
      text             = element_text(color = ink),
      axis.text        = element_text(color = ink),
      legend.position  = "top",
      legend.title     = element_blank(),
      plot.margin      = margin(24, 28, 18, 18)
    )
}

df <- read_csv("propsymbol.csv", show_col_types = FALSE)

# scale_size_area() makes each circle's AREA match the number
p <- ggplot(df, aes(x = fct_inorder(campus), y = 0)) +
  geom_point(aes(size = students), color = "#75AADB", alpha = 0.9) +
  geom_text(aes(y = -0.3, label = paste0(campus, "
", scales::comma(students))),
            vjust = 1, lineheight = 1.1, color = ink, family = font, size = 5) +
  scale_size_area(max_size = 30, guide = "none") +
  scale_y_continuous(limits = c(-1, 1)) +
  labs(x = NULL, y = NULL) +
  theme_gallery() +
  theme(panel.grid = element_blank(), axis.text = element_blank())

ggsave("propsymbol.png", p, width = 9, height = 6, dpi = 200)
p
