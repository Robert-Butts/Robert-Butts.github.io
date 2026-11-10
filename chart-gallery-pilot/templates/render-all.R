# Draws every gallery chart in this folder.
# Put this file in the same folder as the chart scripts and their CSV files,
# set that folder as the working directory, then run this whole script.
# Each chart is saved as a PNG beside its script.

library(tidyverse)

scripts <- setdiff(list.files(pattern = "\\.R$"), "render-all.R")

for (f in scripts) {
  message("Drawing ", f)
  tryCatch(source(f, local = new.env()),
           error = function(e) message("  Problem in ", f, ": ", conditionMessage(e)))
}
