# Streamgraph
# Question: How did interest in each subject flow across a decade?
# Put this script and streamgraph.csv in the same folder, then in RStudio choose
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

pal <- c("Computer Science" = "#75AADB", "Psychology" = "#B79CFF", "Business" = "#F0B95A",
         "Biology" = "#7FD18C", "Art" = "#F38ABE", "History" = "#46D6D1")

df <- read_csv("streamgraph.csv", show_col_types = FALSE)

# 1. Smooth each subject with a spline, so the bands flow between the years
smooth <- df |>
  group_by(subject) |>
  reframe(as_tibble(spline(year, enrollments, n = 200, method = "natural"))) |>
  rename(year = x, enrollments = y) |>
  mutate(enrollments = pmax(enrollments, 0))

# 2. Stack the subjects, then shift each year down by half its total,
#    so the stream is centered on zero instead of sitting on a baseline
stream <- smooth |>
  mutate(subject = factor(subject, levels = names(pal))) |>
  arrange(year, subject) |>
  group_by(year) |>
  mutate(top    = cumsum(enrollments) - sum(enrollments) / 2,
         bottom = top - enrollments) |>
  ungroup()

p <- ggplot(stream, aes(x = year, ymin = bottom, ymax = top, fill = subject)) +
  geom_ribbon(color = "#161B23", linewidth = 0.3) +
  scale_fill_manual(values = pal, name = NULL) +
  guides(fill = guide_legend(reverse = TRUE)) +   # legend order matches the stack, top to bottom
  scale_x_continuous(breaks = seq(2016, 2025, 1), expand = c(0, 0)) +
  labs(x = NULL, y = NULL,
       caption = "Band thickness shows enrollments. The wavy center makes exact values hard to read. Sample values.") +
  theme_gallery() +
  theme(panel.grid = element_blank(), axis.text.y = element_blank(), legend.position = "right",
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("streamgraph.png", p, width = 9, height = 6, dpi = 200)
p
