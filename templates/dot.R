# Dot Plot
# Question: Which programs are above or below the average satisfaction score?
# Put this script and dot.csv in the same folder, then in RStudio choose
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

pal <- c("Above average" = "#75AADB", "Below average" = "#F2716F")

df <- read_csv("dot.csv", show_col_types = FALSE)
avg <- mean(df$satisfaction)

df <- df |>
  mutate(side    = if_else(satisfaction >= avg, "Above average", "Below average"),
         program = fct_reorder(program, satisfaction))   # highest at the top

p <- ggplot(df, aes(x = satisfaction, y = program)) +
  geom_vline(xintercept = avg, color = "#E8EDF4", linetype = "dashed", linewidth = 0.6) +
  annotate("text", x = avg, y = nlevels(df$program) + 0.9, hjust = -0.05,
           label = paste0("Average: ", sprintf("%.2f", avg)), color = "#E8EDF4", family = font, size = 4.2) +
  geom_point(aes(color = side), size = 5) +
  scale_color_manual(values = pal, name = NULL) +
  scale_y_discrete(expand = expansion(add = c(0.6, 1.3))) +
  labs(x = "Average satisfaction (1 to 5)", y = NULL, caption = "Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("dot.png", p, width = 9, height = 6, dpi = 200)
p
