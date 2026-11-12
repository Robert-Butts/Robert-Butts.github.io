# Bubble Chart
# Question: How do programs compare on cost, completion rate, and size?
# Put this script and bubble.csv in the same folder, then in RStudio choose
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

pal <- c("Health" = "#46D6D1", "Science" = "#B79CFF", "Business" = "#F0B95A", "Arts" = "#F38ABE")

df <- read_csv("bubble.csv", show_col_types = FALSE) |>
  arrange(desc(students)) |>   # draw big bubbles first so small ones stay visible on top
  # lift each label above its bubble: bigger bubbles need a bigger lift
  mutate(lift = -0.9 - 2.4 * sqrt(students / max(students)))

p <- ggplot(df, aes(x = cost_thousands, y = completion_rate)) +
  geom_point(aes(size = students, fill = college),
             shape = 21, color = "#161B23", alpha = 0.85, stroke = 0.8) +
  geom_text(aes(label = program, vjust = lift), color = "#E8EDF4", family = font, size = 3.6) +
  scale_size_area(max_size = 22, breaks = c(100, 300, 600), name = "Students") +
  scale_fill_manual(values = pal, name = NULL) +
  scale_x_continuous(labels = scales::dollar_format(suffix = "K"), expand = expansion(mult = 0.1)) +
  scale_y_continuous(labels = function(x) paste0(x, "%"), expand = expansion(mult = 0.12)) +
  guides(fill = guide_legend(override.aes = list(size = 6), order = 1),
         size = guide_legend(override.aes = list(fill = "#8B97A7"), order = 2)) +
  labs(x = "Cost per student", y = "Completion rate",
       caption = "Bubble area shows enrollment. Sample values, not real data.") +
  theme_gallery() +
  theme(legend.position = "right", legend.title = element_text(color = ink, size = 12),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("bubble.png", p, width = 9, height = 6, dpi = 200)
p
