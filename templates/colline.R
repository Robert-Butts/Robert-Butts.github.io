# Column and Line Chart
# Question: How did applications and the acceptance rate move across the years?
# Put this script and colline.csv in the same folder, then in RStudio choose
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

col_color  <- "#75AADB"
line_color <- "#F0B95A"

df <- read_csv("colline.csv", show_col_types = FALSE)

# The rate is drawn on the column scale, then a second axis converts it back.
# 80% on the right lines up with 16,000 on the left, so scale = 200.
# Both axes start at zero. Changing this number can make the story look
# much stronger or weaker, so say what you chose.
scale <- 200

p <- ggplot(df, aes(x = year)) +
  geom_col(aes(y = applications), fill = col_color, alpha = 0.85, width = 0.7) +
  geom_line(aes(y = acceptance_rate * scale), color = line_color, linewidth = 1.3) +
  geom_point(aes(y = acceptance_rate * scale), color = line_color, size = 2.8) +
  scale_x_continuous(breaks = df$year) +
  scale_y_continuous(name = "Applications", labels = scales::comma, limits = c(0, 16000),
                     sec.axis = sec_axis(~ . / scale, name = "Acceptance rate",
                                         labels = function(x) paste0(x, "%"))) +
  labs(x = NULL,
       caption = "Columns: applications (left axis). Line: acceptance rate (right axis). Sample values.") +
  theme_gallery() +
  theme(panel.grid.major.x = element_blank(),
        axis.title.y.left = element_text(color = col_color, margin = margin(r = 8)),
        axis.title.y.right = element_text(color = line_color, margin = margin(l = 8)),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("colline.png", p, width = 9, height = 6, dpi = 200)
p
